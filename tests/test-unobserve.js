import { getSuite } from '../../node_modules/just-test/dist/just-test.js';
import { Observable } from '../../dist/object-observer.js';

const suite = getSuite({ name: 'Testing unobserving/removal of observed object' });

suite.runTest({ name: 'test unobserve - single observer - explicit unobserve' }, () => {
	const
		oo = Observable.from({ some: 'text' }),
		observer = function () {
			cntr++;
		};
	let cntr = 0;

	oo.observe(observer);

	oo.some = 'thing';
	if (cntr !== 1) throw new Error('preliminary check failed - observer was not invoked');

	cntr = 0;
	oo.unobserve(observer);
	oo.some = 'true';
	if (cntr > 0) throw new Error('unobserve failed, expected 0 callbacks, found ' + cntr);
});

suite.runTest({ name: 'test unobserve - few observers - explicit unobserve' }, () => {
	const
		oo = Observable.from({ some: 'text' }),
		observerA = function () {
			cntrA++;
		},
		observerB = function () {
			cntrB++;
		};
	let cntrA = 0,
		cntrB = 0;

	oo.observe(observerA);
	oo.observe(observerB);

	oo.some = 'thing';
	if (cntrA !== 1) throw new Error('preliminary check failed - observerA was not invoked');
	if (cntrB !== 1) throw new Error('preliminary check failed - observerB was not invoked');

	cntrA = 0;
	cntrB = 0;
	oo.unobserve(observerA);
	oo.some = 'true';
	if (cntrA > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrA);
	if (cntrB !== 1) throw new Error('unobserve failed, expected 1 callback for the left alone after unobserve, found ' + cntrB);

	cntrA = 0;
	cntrB = 0;
	oo.unobserve(observerB);
	oo.some = 'back';
	if (cntrA > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrA);
	if (cntrB > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrB);
});

suite.runTest({ name: 'test unobserve - unobserve few' }, () => {
	const
		oo = Observable.from({ some: 'text' }),
		observerA = function () {
			cntrA++;
		},
		observerB = function () {
			cntrB++;
		};
	let cntrA = 0,
		cntrB = 0;

	oo.observe(observerA);
	oo.observe(observerB);

	oo.some = 'thing';
	if (cntrA !== 1) throw new Error('preliminary check failed - observerA was not invoked');
	if (cntrB !== 1) throw new Error('preliminary check failed - observerB was not invoked');

	cntrA = 0;
	cntrB = 0;
	oo.unobserve(observerA, observerB);
	oo.some = 'true';
	if (cntrA > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrA);
	if (cntrB > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrB);
});

suite.runTest({ name: 'test unobserve - unobserve all' }, () => {
	const
		oo = Observable.from({ some: 'text' }),
		observerA = function () {
			cntrA++;
		},
		observerB = function () {
			cntrB++;
		};
	let cntrA = 0,
		cntrB = 0;

	oo.observe(observerA);
	oo.observe(observerB);

	oo.some = 'thing';
	if (cntrA !== 1) throw new Error('preliminary check failed - observerA was not invoked');
	if (cntrB !== 1) throw new Error('preliminary check failed - observerB was not invoked');

	cntrA = 0;
	cntrB = 0;
	oo.unobserve();
	oo.some = 'true';
	if (cntrA > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrA);
	if (cntrB > 0) throw new Error('unobserve failed, expected 0 callbacks for unobserved, found ' + cntrB);
});

suite.runTest({ name: 'test unobserve - observe, unobserve and observe again' }, () => {
	const
		oo = Observable.from({ some: 'text' }),
		observer = function () {
			cntr++;
		};
	let cntr = 0;

	oo.observe(observer);
	oo.some = 'thing';
	if (cntr !== 1) throw new Error('preliminary check failed - observer was not invoked');

	oo.unobserve();
	oo.some = 'true';
	if (cntr !== 1) throw new Error('unobserve failed, expected callbacks for unobserved to remain 1, found ' + cntr);

	oo.observe(observer);
	oo.some = 'again';
	if (cntr !== 2) throw new Error('preliminary check failed - observer was not invoked being added anew');
});
