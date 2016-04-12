//Naïve Bayes
"use strict";
export default {
	bayesData: [],
	possibleValues: {},

	reset(){
		this.bayesData = [];
		this.possibleValues = {};
	},

	addData(entry){
		// add to possible values
		Object.keys(entry).forEach( key => {
			if (!this.possibleValues[key]) {
				this.possibleValues[key] = [entry[key]];
			} else if (this.possibleValues[key].indexOf(entry[key]) == -1) {
				this.possibleValues[key].push(entry[key]);
			}
		});
		this.bayesData.push(entry);
	},

	getDataRow(row){
		return this.bayesData[row];
	},

	countRows(){
		return this.bayesData.length;
	},

	countPossibleValues(column){
		return this.possibleValues[column].length;
	},

	getPossibleValues(column){
		return this.possibleValues[column];
	},

	// valueObj = {column:value,...}
	countValues(valueObj){
		return this.bayesData.filter( (entry) => {
			let ok = true;
			for(let prop in valueObj){
				if (!entry[prop] || entry[prop] !== valueObj[prop]){
					ok = false;
					break;
				}
			}
			return ok;
		}).length;
	},

	// do actual bayes calc
	// valueObj = {column:value,...}
	compute(targetColumn, targetValue, valueObj){
		// find opposits value
		const a = this.getPossibleValues(targetColumn);
		let oppValue;
		if (a[0] == targetValue) {
			oppValue = a[1];
		} else {
			oppValue = a[0];
		}

		const nrOfRows = this.countRows();

		let o = {};
		o[targetColumn] = targetValue;
		let pPos = this.countValues(o);
		let pNeg = nrOfRows - pPos;

		let pxPos = {};
		let pxNeg = {};
		for (let column in valueObj) {
			let oPos = {};
			oPos[column] = valueObj[column];
			oPos[targetColumn] = targetValue;
			pxPos[column] = this.countValues(oPos) / pPos;
			let oNeg = {};
			oNeg[column] = valueObj[column];
			oNeg[targetColumn] = oppValue;
			pxNeg[column] = this.countValues(oNeg) / pNeg;
		}
		pPos /= nrOfRows;
		pNeg /= nrOfRows;

		for (let column in pxPos) {
			pPos *= pxPos[column];
		}
		for (let column in pxNeg) {
			pNeg *= pxNeg[column];
		}
		return [pPos, pNeg];
	}

};

