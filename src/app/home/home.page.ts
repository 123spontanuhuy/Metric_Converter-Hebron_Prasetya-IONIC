import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  conversionResult: number = 0;
  selectedMetricType: string | undefined;
  isMetricDisabled: boolean = true;
  selectedMetricUnit: string | undefined;
  enteredValue: number = 0;
  unitIndex1: number = 0;
  unitIndex2: number = 0;
  unitDifference: number = 0;

  metricTypes = [
    {name: "Panjang"},
    {name: "Massa"},
    {name: "Waktu"},
    {name: "Arus listrik"},
    {name: "Suhu"},
  ];

  lengthUnits = [
    {name: "Milimeter", id: 1},
    {name: "Centimeter", id: 2},
    {name: "Desimeter", id: 3},
    {name: "Meter", id: 4},
    {name: "Dekameter", id: 5},
    {name: "Hektometer", id: 6},
    {name: "Kilometer", id: 7},
  ];

  massUnits = [
    {name: "Miligram", id: 1},
    {name: "Centigram", id: 2},
    {name: "Desigram", id: 3},
    {name: "Gram", id: 4},
    {name: "Dekagram", id: 5},
    {name: "Hektogram", id: 6},
    {name: "Kilogram", id: 7},
  ];

  timeUnits = [
    {name: "Milisekon", id: 1},
    {name: "Centisekon", id: 2},
    {name: "Desisekon", id: 3},
    {name: "Sekon", id: 4},
    {name: "Dekasekon", id: 5},
    {name: "Hektosekon", id: 6},
    {name: "Kilosekon", id: 7},
  ];

  currentUnits = [
    {name: "Miliampere", id: 1},
    {name: "Centiampere", id: 2},
    {name: "Desiampere", id: 3},
    {name: "Ampere", id: 4},
    {name: "Dekaampere", id: 5},
    {name: "Hektoampere", id: 6},
    {name: "Kiloampere", id: 7},
  ];

  temperatureUnits = [
    {name: "Celcius", id: 1},
    {name: "Fahrenheit", id: 2},
    {name: "Kelvin", id: 3},
  ];

  setUnitIndex1(event: any) {
    this.unitIndex1 = event.target.value.id;
    if (this.enteredValue !== 0 && this.unitIndex2 !== 0) {
      this.calculateConversion(this.enteredValue);
    }
  }

  setUnitIndex2(event: any) {
    this.unitIndex2 = event.target.value.id;
    if (this.enteredValue !== 0 && this.unitIndex1 !== 0) {
      this.calculateConversion(this.enteredValue);
    }
  }

  calculateConversion(inputValue: any) {
    if (typeof inputValue === "object") {
      this.enteredValue = inputValue.target.value;
    } else {
      this.enteredValue = inputValue;
    }
    if (this.unitIndex1 !== 0 && this.unitIndex2 !== 0) {
      if (
        this.selectedMetricType === "Panjang" ||
        this.selectedMetricType === "Massa" ||
        this.selectedMetricType === "Waktu" ||
        this.selectedMetricType === "Arus listrik"
      ) {
        this.unitDifference = this.unitIndex1 - this.unitIndex2;
        if (this.unitDifference > 0) {
          this.conversionResult = this.enteredValue;
          for (let i = 0; i < this.unitDifference; i++) {
            this.conversionResult *= 10;
          }
        } else if (this.unitDifference < 0) {
          this.unitDifference = Math.abs(this.unitDifference);
          this.conversionResult = this.enteredValue;
          for (let i = 0; i < this.unitDifference; i++) {
            this.conversionResult /= 10;
          }
        } else if (this.unitDifference === 0) {
          this.conversionResult = this.enteredValue;
        }
      } else if (this.selectedMetricType === "Suhu") {
        if ((this.unitIndex1 === 1 && this.unitIndex2 === 1) || (this.unitIndex1 === 2 && this.unitIndex2 === 2) || (this.unitIndex1 === 3 && this.unitIndex2 === 3)) {
          this.conversionResult = this.enteredValue;
        } else if (this.unitIndex1 === 1 && this.unitIndex2 === 2) {
          this.conversionResult = (this.enteredValue * 9) / 5 + 32;
        } else if (this.unitIndex1 === 1 && this.unitIndex2 === 3) {
          this.conversionResult = Number(this.enteredValue) + 273.15;
        } else if (this.unitIndex1 === 2 && this.unitIndex2 === 1) {
          this.conversionResult = (this.enteredValue - 32) * 5 / 9;
        } else if (this.unitIndex1 === 2 && this.unitIndex2 === 3) {
          this.conversionResult = ((this.enteredValue - 32) * 5 / 9) + 273.15;
        } else if (this.unitIndex1 === 3 && this.unitIndex2 === 1) {
          this.conversionResult = Number(this.enteredValue) - 273.15;
        } else if (this.unitIndex1 === 3 && this.unitIndex2 === 2) {
          this.conversionResult = ((this.enteredValue - 273.15) * 9) / 5 + 32;
        }
      }
    }
  }

  handleMetricChange(event: any) {
    this.selectedMetricType = JSON.stringify(event.target.value.name);
    this.selectedMetricType = this.selectedMetricType.replace(/['"]+/g, '');
    this.isMetricDisabled = false;
    this.conversionResult = 0;
    this.unitIndex1 = 0;
    this.unitIndex2 = 0;
    this.unitDifference = 0;
  }
}
