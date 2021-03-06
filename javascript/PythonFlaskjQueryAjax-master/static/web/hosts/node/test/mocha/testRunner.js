// @version: $$Id: testRunner.js 793 2016-05-17 02:42:18Z cxh $$
// Instantiate the test/Test accessor and provide the common host test file
// as input.
// This test requires mocha and chai.  To install these:
// sudo npm install -g mocha
// sudo npm install -g chai
//
// The test can be run using the nodeHostShell.  From this directory:
// node ../../nodeHostShell.js < ./testCommon.js
//
// Output:
//   mocha testCommon.js

// FIXME: we should not need to require nodeHost.js here.
// We must require nodeHost here if running mocha from the command
// line and running mocha from within ant is to work.
//
// From the command line:
//    cd accessors/web; mocha hosts/node/test/mocha/testCommon.js
// From ant:
//    cd accessors/web; ant tests.mocha
//
// Solution: use something similar to what is in accessors/web/hosts/common/commonHost.js
// and conditionally require nodeHost.js.
//
if (typeof process !== 'undefined' && typeof process.version === 'string') {
    var nodeHost = require('../../nodeHost.js');
}

var a = instantiate('Test', 'test/Test');
a.initialize();

// FIXME: We can't use try catch here because the the error happens in the input handler.
// This works for the node host:
a.provideInput('testFile', 'hosts/browser/test/test/testRunner.js');

// This works for the browser host:
// FIXME: Why would the browser host be running tests in hosts/node/test/mocha?
//a.provideInput('testFile', '../../../browser/test/test/testRunner.js');

a.react();
a.wrapup();

// This test causes all the error output to be generated before
// proceeding, which makes it much easier to read the output of 'ant
// tests.mocha'.
it('Wait 1 second for error output to complete', function(done) {
    // See https://mochajs.org/#timeouts
    this.timeout(2000);
    setTimeout(function () {done(); console.log("node/test/mocha/testRunner.js done");}, 1000);
});

//try {
//    quit();
//} catch (error) {
//    console.log("testCommon.js: quit failed, this is expected under Node.");
//}
