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

    //Do I need to typeof this?
    //To Contain? in the results array?
    
    //expect(typeof testStatusCheck).toBe("object");
    /*This is tricky, I want to check that whatever we name the obj from receiveMessage
    has a roverStatus obj in the results value array that includes mode, watts, position
    "Check each of these for accuracy is ambiguous re. mode, watts, position"
    also includes completed value set to true if command goes through
    */
    expect(testStatusCheck).toContain(roverStatus);
    expect(testStatusCheck).toHaveProperty('mode');
    expect(testStatusCheck).toHaveProperty('generatorWatts');
    expect(testStatusCheck).toHaveProperty('position');
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
