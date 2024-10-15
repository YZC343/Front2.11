import React, { useState  , useEffect,useLayoutEffect} from 'react';
import { Box, Grid, Chip, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Formik,useFormik } from 'formik';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import DatePicker from "react-datepicker";
  import 'react-datepicker/dist/react-datepicker.css';
  import { cn } from "@/lib/utils"

const initialDummyData = [
    {BMI:15 ,time: '2024-01', WBC: 6000, HGB: 14, RBC: 4.5, diagnosis: 'Diagnosis Method 1', sex: 'Male' },
    {BMI:33 ,time: '2024-01', WBC: 6400, HGB: 16, RBC: 3.5, diagnosis: 'Diagnosis Method 5', sex: 'Female' },
    {BMI:20 ,time: '2024-02', WBC: 6200, HGB: 13.9, RBC: 4.6, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    {BMI:17 ,time: '2024-03', WBC: 6100, HGB: 14.1, RBC: 4.7, diagnosis: 'Diagnosis Method 3', sex: 'Male' },
    {BMI:26 ,time: '2024-04', WBC: 6300, HGB: 14.2, RBC: 4.8, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    {BMI:30 ,time: '2024-05', WBC: 6400, HGB: 14.3, RBC: 4.9, diagnosis: 'Diagnosis Method 4', sex: 'Male' },
    {BMI:23 ,time: '2024-06', WBC: 6500, HGB: 14.5, RBC: 5.0, diagnosis: 'Diagnosis Method 2', sex: 'Female' },

    {BMI:33 ,time: '2024-07', WBC: 6400, HGB: 16, RBC: 3.5, diagnosis: 'Diagnosis Method 5', sex: 'Male' },
    {BMI:19 ,time: '2024-08', WBC: 5900, HGB: 15.9, RBC: 6.6, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
    {BMI:27 ,time: '2024-9', WBC: 5893, HGB: 17.1, RBC: 3.7, diagnosis: 'Diagnosis Method 3', sex: 'Male' },
    {BMI:31 ,time: '2024-10', WBC: 6123, HGB: 13.2, RBC: 8.8, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    {BMI:20 ,time: '2024-11', WBC: 6413, HGB: 12.3, RBC: 6.9, diagnosis: 'Diagnosis Method 2', sex: 'Male' },
    {BMI:21 ,time: '2024-12', WBC: 5734, HGB: 15.5, RBC: 4.0, diagnosis: 'Diagnosis Method 4', sex: 'Female' },
];

const ControlAndDisplay: React.FC = () => {


    const formik = useFormik({
        initialValues:{ startDate: new Date(2023,11), endDate: new Date(2025,1),sex:'',BMI:'0,100',ethnicity:'' },
        onSubmit: (values) => {
            console.log(values);
        },
     })



    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('WBC');

    
    

   

    const [filteredData, setFilteredData] = useState(initialDummyData);

    const handleFilterApply = () => {

        setSelectedFilters([]);

        const newFilter = `Sex: ${formik.values.sex}}`;
        if (!selectedFilters.includes(newFilter) && formik.values.sex) {
            setSelectedFilters((prev) => [...prev, newFilter]);
        }
        
        const newFilterBMI = `BMI: ${formik.values.BMI.toString()}`;
        if(!selectedFilters.includes(formik.values.BMI.toString()) && formik.values.BMI){
            setSelectedFilters((prev) => [...prev, newFilterBMI]);
        }
       /* const str = formik.values.BMI;
        const range: number[] = str.split(',').map(Number);
       */
        const range: number[] = (formik.values.BMI).split(',').map(Number);

        const newFilterstartDate = `StartDate: ${formik.values.startDate.getMonth()}`;
        if (!selectedFilters.includes(newFilterstartDate) && formik.values.startDate) {
            setSelectedFilters((prev) => [...prev, newFilterstartDate]);
        }

        const newFilterendDate = `EndDate: ${formik.values.endDate.getMonth()}`;
        if (!selectedFilters.includes(newFilterendDate) && formik.values.endDate) {
            
            setSelectedFilters((prev) => [...prev, newFilterendDate]);
        }

        const startDate:Date= formik.values.startDate;
        const endDate:Date = formik.values.endDate;
        


        const newFfilterEthnicity = `Ethnicity: ${formik.values.ethnicity}`;
        // Apply filtering based on the selected sex
        const newFilteredData = initialDummyData.filter((item) => (!formik.values.sex || item.sex === formik.values.sex)
        &&((item.BMI >= range[0] && item.BMI <= range[1]))
        &&((new Date(item.time) >= startDate && new Date(item.time) <= endDate))
    );
        setFilteredData(newFilteredData);
    };

/*
    const handleChipDelete = (chipToDelete: string) => {
        setSelectedFilters((chips) => chips.filter((chip) => chip !== chipToDelete));
        // Reset to initial data when a filter is removed
        setFilteredData(initialDummyData);
        const name = chipToDelete.split(':')[0];
        if(name === 'Sex'){
            setSex('');
        }
        else if(name === 'BMI'){
            setBMI('');
        }
        else if(name === 'StartDate'){
            setStartDate(new Date('2023,12'));
        }
        else if(name === 'EndDate'){
            setEndtDate(new Date('2025,1'));
        }
        handleFilterApply();
    };
*/
    const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMetric(event.target.value);
    };

  

    
    useEffect(() => {
       /* console.log('formik has been update:', formik.values);  */
        handleFilterApply();
    }, [formik]);
    

    

   
 


    








    

    


    return (
        <Box  sx={{ padding: 2}}>

            
            {/* Top Section: Filters */}
            <Box sx={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: 2, padding: 2, marginBottom: 4 }}>
            <Box sx={{flexDirection:'column'

            }} >
                    <Box sx={{m: 2}}>
                        {/* Todo: Move this icon-title pattern into component */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                            <TuneIcon sx={{ mr: 1, mb: 1, color: 'purple' }} />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Control Panel
                        </Typography>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 4,
                                left: 0,
                                width: '100%',
                                height: 2,
                                bgcolor: 'purple',
                            }}
                            />
                        </Box>
                    </Box>



                    <form
                        onSubmit={formik.handleSubmit}
                        
                        
                    >
                    <Box sx={{display:'flex',marginTop:4,marginBottom: 4,justifyContent:'center',alignItems:'center',}}>
                        <div
                        style={{margin:20,display:'flex'}}
                        >
                            <Select
                               name='sex'
                               onValueChange={(event: string)=>formik.setFieldValue('sex',event)}
                             /*  value={formik.values.sex}   */
                               >
                                <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                
                                    <SelectGroup >
                                    <SelectItem value="Male" >Male</SelectItem>
                                    <SelectItem value="Female" >Female</SelectItem>
                                    
                                    </SelectGroup>
                                    
                                </SelectContent>
                                
                            </Select>
                            
                            </div>
                        <div style={{margin:20}}>
                             <Select 
                                name='BMI'
                                onValueChange={(event: string)=>formik.setFieldValue('BMI',event)}
                               /* value={formik.values.BMI}  */
                             >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="BMI" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="0,18">Underweight(&lt;18)</SelectItem>
                                    <SelectItem value="18,24.9">Normal(18-24.9)</SelectItem>
                                    <SelectItem value="25,29.9">Overweight(25-29.9)</SelectItem>
                                    <SelectItem value="29.9,100">Obesity(&gt;30)</SelectItem>
                                    </SelectGroup>
                                   
                                </SelectContent>
                            </Select>
                        </div>
                        <div style={{margin:20}}>
                            <Select 
                                name='ethnicity'
                                onValueChange={(event: string)=>formik.setFieldValue('ethnicity',event)}
                                value={formik.values.ethnicity}
                                
                            >
                                <SelectTrigger style={{width:180}} className="w-[180px]">
                                    <SelectValue placeholder="Ethnicity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>White</SelectLabel>
                                    <SelectItem value="White British">White British</SelectItem>
                                    <SelectItem value="White Irish">White Irish</SelectItem>
                                    <SelectItem value="Other White Background">Other White Background</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                    <SelectLabel>Asian</SelectLabel>
                                    <SelectItem value="Asian Indian">Asian Indian</SelectItem>
                                    <SelectItem value="Asian Pakistani">Asian Pakistani</SelectItem>
                                    <SelectItem value="Asian Bangladeshi">Asian Bangladeshi</SelectItem>
                                    <SelectItem value="Other Chinese">Other Chinese</SelectItem>
                                    <SelectItem value="Other Asian Background">Other Asian Background</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                    <SelectLabel>Black</SelectLabel>
                                    <SelectItem value="Black Carbbean">Black Carbbean</SelectItem>
                                    <SelectItem value="Black African">Black African</SelectItem>
                                    <SelectItem value="Other Black Background">Other Black Background</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                    <SelectLabel>Mixed</SelectLabel>
                                    <SelectItem value="Mixed White and Asian">Mixed White and Asian</SelectItem>
                                    <SelectItem value="Mixed White and Black African">Mixed White and Black African</SelectItem>
                                    <SelectItem value="Mixed White and Black Caribbean">Mixed White and Black Caribbean</SelectItem>
                                    <SelectItem value="Other Mixed Background">Other Mixed Background</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div  style={{margin:20}}>
                            <span style={{fontSize:10}}>Start Time</span>
                        <DatePicker
                            className={cn(
                                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              )}
                              name='startDate'
                              selected={formik.values.startDate as unknown as Date}
                              onChange={(event: Date| null)=>formik.setFieldValue('startDate',event)}
                           dateFormat="MMMM/yyyy"
                           showMonthYearPicker
                            />

                        </div>
                        <div style={{margin:20}}>
                        <span style={{fontSize:10}}>End Time</span>
                            <DatePicker
                            className={cn(
                                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              )}
                           name='endDate'
                           selected={formik.values.endDate as unknown as Date}
                           onChange={(event: Date| null)=>formik.setFieldValue('endDate',event)}
                        
                           dateFormat="MMMM/yyyy"
                           showMonthYearPicker
                            />
                            </div>
                    </Box >
                    </form>



                    
                    <Box sx={{display:'inline-flex',width:'100%',height:'100'}} >
                        {selectedFilters.map((filter, index) => (
                            <Chip 
                                key={index}
                                label={filter}
                                onDelete={() => handleChipDelete(filter)}
                                sx={{minWidth:100, maxWidth:200, marginRight: 1, marginBottom: 1 }}
                            />
                        ))}   
                    </Box>
                    
                </Box>   
            </Box>
            {/* Bottom Section */}
            <Box sx={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: 2, padding: 2 }}>
                <Box sx={{mb: 2}}>
                    {/* Todo: Move this icon-title pattern into component */}
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                        <NewspaperIcon sx={{ mr: 1, mb: 1, color: 'purple' }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Trends
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 4,
                            left: 0,
                            width: '100%',
                            height: 2,
                            bgcolor: 'purple',
                        }}
                        />
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}   >
                    {/* Left Side: Top 5 Diagnosis Methods */}
                    <div>
                        <Typography variant="h6">Top 5 Diagnosis Methods</Typography>
                        <List>
                            {filteredData.slice(0, 5).map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item.diagnosis} />
                                </ListItem>
                            ))}
                        </List>
                    </div>

                    {/* Right Side: Line Charts */}
                    <div style={{width:'40%'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Metric</FormLabel>
                            <RadioGroup
                                row
                                aria-label="metric"
                                name="metric"
                                value={selectedMetric}
                                onChange={handleMetricChange}
                            >
                                <FormControlLabel value="WBC" control={<Radio />} label="WBC" />
                                <FormControlLabel value="HGB" control={<Radio />} label="HGB" />
                                <FormControlLabel value="RBC" control={<Radio />} label="RBC" />
                            </RadioGroup>
                        </FormControl>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <legend />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default ControlAndDisplay;
