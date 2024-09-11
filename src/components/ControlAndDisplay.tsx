import React, { useState ,  useRef} from 'react';
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
  } from "@/components/ui/select"

const initialDummyData = [
    { time: 'Jan', WBC: 6000, HGB: 14, RBC: 4.5, diagnosis: 'Diagnosis Method 1', sex: 'Male' },
    { time: 'Feb', WBC: 6200, HGB: 13.9, RBC: 4.6, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
    { time: 'Mar', WBC: 6100, HGB: 14.1, RBC: 4.7, diagnosis: 'Diagnosis Method 3', sex: 'Male' },
    { time: 'Apr', WBC: 6300, HGB: 14.2, RBC: 4.8, diagnosis: 'Diagnosis Method 1', sex: 'Female' },
    { time: 'May', WBC: 6400, HGB: 14.3, RBC: 4.9, diagnosis: 'Diagnosis Method 4', sex: 'Male' },
    { time: 'Jun', WBC: 6500, HGB: 14.5, RBC: 5.0, diagnosis: 'Diagnosis Method 2', sex: 'Female' },
];

const ControlAndDisplay: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState('WBC');
    const [sex,setSex] = useState('');
    const [BMI,setBMI] = useState('');
    const [ethnicity,setethnicity] = useState('');
    const [filteredData, setFilteredData] = useState(initialDummyData);

    const handleFilterApply = () => {
        const newFilter = `Sex: ${sex}`;
        if (!selectedFilters.includes(newFilter) && sex) {
            setSelectedFilters((prev) => [...prev, newFilter]);
        }

        // Apply filtering based on the selected sex
        const newFilteredData = initialDummyData.filter((item) => !sex || item.sex === sex);
        setFilteredData(newFilteredData);
    };

    const handleChipDelete = (chipToDelete: string) => {
        setSelectedFilters((chips) => chips.filter((chip) => chip !== chipToDelete));
        // Reset to initial data when a filter is removed
        setFilteredData(initialDummyData);
    };

    const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMetric(event.target.value);
    };

    const handleSexChange = (value: string) => {
            setSex(value);
            console.log(sex);
    };

    const handleBMIChange = (value: string) => {
        setBMI(value);
        console.log(BMI);
    };

    const handleethnicityChange = (value: string) => {
        setethnicity(value);
        console.log(ethnicity);
};


    const handleClearSexSelection = () => {
        setSex('');
    };

    const handleClearBMISelection = () => {
        setBMI('');
    };

    const handleClearethnicitySelection = () => {
        setethnicity('');
    };



    

    


    return (
        <Box sx={{ padding: 2}}>
            {/* Top Section: Filters */}
            <Box sx={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: 2, padding: 2, marginBottom: 4 }}>
            <Box sx={{flexDirection
                :'row'
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
                            <Select  onValueChange={handleSexChange}>
                                <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                
                                    <SelectGroup >
                                    <SelectItem value="Male" >Male</SelectItem>
                                    <SelectItem value="Female" >Female</SelectItem>
                                    <Button style={{width:40,}} color="white" variant="ghost" onClick={handleClearSexSelection}>x</Button>
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
                                    <SelectItem value="Underweight">Underweight(&lt;18)</SelectItem>
                                    <SelectItem value="Normal">Normal(18-24.9)</SelectItem>
                                    <SelectItem value="Overweight">Overweight(25-29.9)</SelectItem>
                                    <SelectItem value="Obesity">Obesity(&gt;30)</SelectItem>
                                    </SelectGroup>
                                    <Button style={{width:40,}} color="white" variant="ghost" onClick={handleClearBMISelection}>x</Button>
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
                                    <Button style={{width:40,}} color="white" variant="ghost" onClick={handleClearethnicitySelection}>x</Button>
                                </SelectContent>
                            </Select>
                        </div>
                        <div style={{margin:20}}><StartTime /></div>
                        <div style={{margin:20}}><EndTime /></div>
                        
                        
                        
                        
                        
                        
                        
                        
                  
                    </Box >
                    <Grid item xs={12}>
                        {selectedFilters.map((filter, index) => (
                            <Chip
                                key={index}
                                label={filter}
                                onDelete={() => handleChipDelete(filter)}
                                sx={{ marginRight: 1, marginBottom: 1 }}
                            />
                        ))}
                    </Grid>
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
