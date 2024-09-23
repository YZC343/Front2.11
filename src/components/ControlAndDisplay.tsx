import React, { useState ,  useRef, useEffect} from 'react';
import { Box, Grid, TextField, Chip, FormControl, InputLabel, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {SelectBMI} from './ui/SelectBMI'
import {Ethnicity} from './ui/SelectEthnicity.tsx'
import { StartTime } from './ui/StartTime.tsx';
import {EndTime} from './ui/EndTime.tsx'
import {Apply} from './ui/ApplyButton.tsx'
import { Blocks, Columns, Rows } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
import { newDate } from 'react-datepicker/dist/date_utils';

const initialDummyData = [
    {BMI:15 ,time: '2024,1', WBC: 6000, HGB: 14, RBC: 4.5, diagnosis: 'Diagnosis Method 1', sex: 'Male' },
    {BMI:20 ,time: '2024,2', WBC: 6200, HGB: 13.9, RBC: 4.6, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
    {BMI:17 ,time: '2024,3', WBC: 6100, HGB: 14.1, RBC: 4.7, diagnosis: 'Diagnosis Method 3', sex: 'Male' },
    {BMI:26 ,time: '2024,4', WBC: 6300, HGB: 14.2, RBC: 4.8, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    {BMI:30 ,time: '2024,5', WBC: 6400, HGB: 14.3, RBC: 4.9, diagnosis: 'Diagnosis Method 4', sex: 'Male' },
    {BMI:23 ,time: '2024,6', WBC: 6500, HGB: 14.5, RBC: 5.0, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
];

const ControlAndDisplay: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('WBC');

    const [sex,setSex] = useState('');
    
    const [BMI,setBMI] = useState('');
    const [ethnicity,setethnicity] = useState('');

    const [startDate, setStartDate] = useState(new Date('2024,1'));
    const [endDate, setEndtDate] = useState(new Date('2024,12'));

    const [filteredData, setFilteredData] = useState(initialDummyData);

    const handleFilterApply = () => {

        setSelectedFilters([]);

        const newFilter = `Sex: ${sex}`;
        if (!selectedFilters.includes(newFilter) && sex) {
            setSelectedFilters((prev) => [...prev, newFilter]);
        }
        
        const newFilterBMI = `BMI: ${BMI}`;
        if(!selectedFilters.includes(BMI) && BMI){
            setSelectedFilters((prev) => [...prev, newFilterBMI]);
        }
        const str = BMI;
        const range: number[] = str.split(',').map(Number);

        const newFilterstartDate = `StartDate: ${startDate}`;
        if (!selectedFilters.includes(newFilterstartDate) && startDate) {
            setSelectedFilters((prev) => [...prev, newFilterstartDate]);
        }

        const newFilterendDate = `EndDate: ${endDate}`;
        if (!selectedFilters.includes(newFilterendDate) && endDate) {
            
            setSelectedFilters((prev) => [...prev, newFilterendDate]);
        }
        


        const newFilterEthnicity = `Ethnicity: ${ethnicity}`;
        // Apply filtering based on the selected sex
        const newFilteredData = initialDummyData.filter((item) => (!sex || item.sex === sex)
        &&((item.BMI >= range[0]&& item.BMI <= range[1])|| BMI === '')
        &&((new Date(item.time) >= startDate && new Date(item.time) <= endDate))
    );
        setFilteredData(newFilteredData);
    };

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
            setStartDate(new Date('2024,1'));
        }
        else if(name === 'EndDate'){
            setEndtDate(new Date('2024,12'));
        }
        handleFilterApply();
    };

    const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMetric(event.target.value);
    };

    const handleSexChange = (value: string) => {

            setSex(value);
            
    };

    useEffect(() => {
        console.log('sex has been updated:', sex);
        handleFilterApply();
    }, [sex,BMI,startDate,endDate],);

    const handleBMIChange = (value: string) => {
        setBMI(value);
        console.log(BMI);
    };

    const handleethnicityChange = (value: string) => {
        setethnicity(value);
        console.log(ethnicity);
};


   



    








    

    


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
                    <Box sx={{display:'flex',marginTop:4,marginBottom: 4,justifyContent:'center',alignItems:'center',}}>
                        <div  style={{margin:20,display:'flex'}}>
                            <Select   onValueChange={handleSexChange}>
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
                             <Select onValueChange={handleBMIChange}>
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
                            <Select onValueChange={handleethnicityChange}>
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
                           selected={startDate}
                           onChange={(date) => setStartDate(date as Date)}
                           dateFormat="MMMM/yyyy"
                           showMonthYearPicker
                            />

                        </div>
                        <div style={{margin:20}}>
                        <span style={{fontSize:10}}>Start Time</span>
                            <DatePicker
                            className={cn(
                                "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              )}
                           selected={endDate}
                           onChange={(date) => setEndtDate(date as Date)}
                           dateFormat="MMMM/yyyy"
                           showMonthYearPicker
                            />
                            </div>
                        
                        
                        
                        
                        
                        
                        
                        
                  
                    </Box >
                    <Box sx={{display:'inline-flex'}} >
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
                <Grid container spacing={2}>
                    {/* Left Side: Top 5 Diagnosis Methods */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Top 5 Diagnosis Methods</Typography>
                        <List>
                            {filteredData.slice(0, 5).map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item.diagnosis} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Right Side: Line Charts */}
                    <Grid item xs={12} md={8}>
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
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ControlAndDisplay;
