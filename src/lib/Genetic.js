import Random from './Random'
"use strict";

export default {
	template: {},
	db: [],
	individuals: 0,
	generations: 0,
	bestIndividuals: [],
	fitnessFunc: null,
	anomalyAdd: 0,


	/*
	let template = {
			"dna": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			"dnaMin": 0,
			"dnaMax": 100,
			"dnaStep": 10,
			"fitness": 0,
			"anomalyAdd": 0.00 // optional
	}
	*/
	setTemplate(template) {
		this.template = template;
		if (this.template.anomalyAdd) {
			this.anomalyAdd = this.template.anomalyAdd;
			console.log(this.anomalyAdd + 1);
		}
	},

	setIndividuals(indivdualsData) {
		this.db = indivdualsData;
	},

	setParams(individuals, generations, fitnessFunc) {
		this.individuals = individuals;
		this.generations = generations;
		this.fitnessFunc = fitnessFunc;
	},

	run() {
		if (this.db.length == 0) {
			// create random individuals

			for (let i = 0; i < this.individuals; i++) {
				this.db.push(this.createDna());
			}
		}

		// loop generations
		for (var j = 0; j < this.generations; j++) {
			//run the fitness
			for (let i = 0; i < this.db.length; i++) {
				this.db[i].fitness = this.fitnessFunc(this.db[i].dna);
			}

			//sort on fitness
			this.db.sort(function (a, b) {
				return b.fitness - a.fitness
			});

			//save best dna to best list
			if (this.bestIndividuals.length == 0) {
				this.bestIndividuals.push(this.db[0]);
			} else {
				this.bestIndividuals.sort(function (a, b) {
					return b.fitness - a.fitness
				});
				if (this.db[0].fitness > this.bestIndividuals[0].fitness) {
					this.bestIndividuals.push({
						fitness: this.db[0].fitness,
						dna: this.db[0].dna,
						generation: j
					});
				}
			}
			//console.log("generation:"+j + " best in generation:"+this.db[0].fitness+" dna:"+this.db[0].dna);

			//crossbreed [x,x,x,x,y,y,y,y] and mutate
			var len = this.db.length / 2;
			var newDb = [];
			for (var i = 0; i < len; i += 2) {
				// let good parents live
				newDb.push(this.db[i]);
				newDb.push(this.db[i + 1]);
				// first child
				var newDna1 = this.crossBreed(this.db[i], this.db[i + 1]);
				this.mutate(newDna1);
				newDb.push(newDna1);
				//second child
				var newDna2 = this.crossBreed(this.db[i + 1], this.db[i]);
				this.mutate(newDna2);
				newDb.push(newDna2);
			}
			this.db = newDb;
		}

		console.log("-----------------");
		console.log("generations:" + this.generations);
		console.log("individuals:" + this.individuals);
		console.log("the best:");
		console.log(this.bestIndividuals[0]);
	},

	createDna() {
		var dnaObject = {
			fitness: 0,
			dna: []
		};
		for (var i = 0; i < this.template.dna.length; i++) {
			var range = (this.template.dnaMax - this.template.dnaMin) / this.template.dnaStep;
			var rand = this.template.dnaMin + Math.floor(Random.get() * (range + 1)) * this.template.dnaStep;
			dnaObject.dna.push(rand + (i * this.anomalyAdd));
		}
		return dnaObject;
	},

	crossBreed(dna1, dna2) {
		var newDna = {
			fitness: 0,
			dna: []
		};
		newDna.dna = newDna.dna.concat(dna1.dna.slice(0, dna1.dna.length / 2), dna2.dna.slice(dna2.dna.length / 2));
		return newDna;
	},

	mutate(dna) {
		var pos = Math.floor(Random.get() * dna.dna.length);
		var range = (this.template.dnaMax - this.template.dnaMin) / this.template.dnaStep;
		var rand = this.template.dnaMin + Math.floor(Random.get() * (range + 1)) * this.template.dnaStep;
		dna.dna[pos] = rand + (pos * this.anomalyAdd);
	}

};

