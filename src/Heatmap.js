import * as Plotly from "plotly.js-dist";



let x = 1; 
export function plot(data, heatLayout){
    // console.log(x);
    x+=1;
    Plotly.newPlot('myDiv', data, heatLayout);
}  
  
