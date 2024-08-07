const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  //Test 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(98382);

    expect(testRover.position).toBe(98382);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
  //Test 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with commands', testCommands);
    let testRover = new Rover(98382);
    let testResponse = testRover.receiveMessage(testMessage);

    expect(testResponse.message).toBe(testMessage.name);

  });
  //Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with commands', testCommands);
    let testRover = new Rover(98382);
    let testResponse = testRover.receiveMessage(testMessage);
    
    if (testCommands.length === 2)
      expect(testResponse['results'].length).toBe(2);
  });
  //Test 10
  test("responds correctly to the status check command", function() {
    let testCommand = new Command('STATUS_CHECK');
    let testMessage = new Message('Status Check Test', testCommand);
    let testRover = new Rover(98382);
    let testStatusCheck = testRover.receiveMessage(testMessage).results;
    let verifyRoverStatus = testStatusCheck.find({roverStatus});

    expect(testStatusCheck).toEqual(arrayContaining({roverStatus})); //Do I need the brackets to signify it's an object?
    expect(verifyRoverStatus).toHaveProperty('mode', 'NORMAL' || 'LOW_POWER'); //Attempt at using operators in tests
    expect(verifyRoverStatus).toHaveProperty('generatorWatts', expect.any(Number)); //Attempt at checking datatypes for the optional value slot in toHaveProperty
    expect(verifyRoverStatus).toHaveProperty('position', expect.any(Number));
  });
  //Test 11
  test("test 11 placeholder", function() {

  });
  //Test 12
  test("test 12 placeholder", function() {

  });
  //Test 13
  test("test 13 placeholder", function() {

  });

});
