import should from 'should';
import expect from 'expect';
import Genetic from '../src/lib/Genetic';
import immutable from 'immutable';

describe('Genetic', ()=> {

	let rnd = 0;
	let template = {};

	beforeEach(()=>{
		rnd = 0;
		template = {
			dna: [0, 0, 0, 0],
			dnaMin: 0,
			dnaMax: 10,
			dnaStep: 1,
			fitness: 0,
			anomalyAdd: 0.00 // optional
		};
		Genetic.setTemplate(template);
		Genetic.__Rewire__('Random',{
			get:() => rnd
		});
	});

	afterEach(function() {
		Genetic.__ResetDependency__('Random');
	});


	it('should crossbreed correctly', ()=> {
		let dna0 = {dna:[0,0,0,0]};
		let dna1 = {dna:[1,1,1,1]};
		let newDna = Genetic.crossBreed(dna0,dna1);
		expect(newDna.dna.toString()).toBe([0,0,1,1].toString());

		dna0 = {dna:[0,0,0]};
		dna1 = {dna:[1,1,1]};
		newDna = Genetic.crossBreed(dna0,dna1);
		expect(newDna.dna.toString()).toBe([0,1,1].toString());
	});

	it('should create proper dna',()=>{

		let dna = Genetic.createDna();
		expect(dna.dna.toString()).toBe([0,0,0,0].toString());

		rnd = 0.9999999;
		dna = Genetic.createDna();
		expect(dna.dna.toString()).toBe([10,10,10,10].toString());

		rnd = 0.5;
		template.dnaStep = 2;
		dna = Genetic.createDna();
		expect(dna.dna.toString()).toBe([6,6,6,6].toString());
	});

	it('should mutate at correct position',()=>{
		let dna ={dna:[10, 10, 10, 10]};
		Genetic.mutate(dna);
		expect(dna.dna.toString()).toBe([0,10,10,10].toString());

		rnd = 0.9999999;
		dna ={dna:[0, 0, 0, 0]};
		Genetic.mutate(dna);
		expect(dna.dna.toString()).toBe([0,0,0,10].toString());
	});
	it('test run',()=>{
		Genetic.setParams(10,()=>2);
		const gen = Genetic.runOneGeneration();
		expect(gen.dna.toString()).toBe([0,0,0,0].toString());
		expect(gen.fitness).toBe(2);
	});

});

