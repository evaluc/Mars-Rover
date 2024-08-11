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

    //This test could be more generalized?
    expect(testResponse.message).toBe(testMessage.name);

  });
  //Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message with two commands', testCommands);
    let testRover = new Rover(98382);
    let testResponse = testRover.receiveMessage(testMessage);
    
    if (testCommands.length === 2)
      expect(testResponse['results'].length).toBe(2)

  });
  //Test 10
  test("responds correctly to the status check command", function() {
    let testCommand = [new Command('STATUS_CHECK')];
    let testMessage = new Message('Status Check Test', testCommand);
    let testRover = new Rover(98382);
    let testStatusCheck = testRover.receiveMessage(testMessage).results;
   
  //Could be refactored by modifying 2nd expect/line 54 to include the properties mentioned in the 3-5th expect statements
    expect(typeof testStatusCheck[0]['roverStatus']).toEqual('object');
    expect(testStatusCheck[0]).toEqual(expect.objectContaining({roverStatus: expect.any(Object)}));
    expect(testStatusCheck[0]['roverStatus']).toHaveProperty('mode', 'NORMAL' || 'LOW_POWER'); 
    expect(testStatusCheck[0]['roverStatus']).toHaveProperty('generatorWatts', expect.any(Number));
    expect(testStatusCheck[0]['roverStatus']).toHaveProperty('position', expect.any(Number));

  });
  //Test 11
  test("responds correctly to the mode change command", function() {
    let testCommandLowPower = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let testCommandNormalPower = [new Command('MODE_CHANGE', 'NORMAL')];
    let testPowerCommandsSequence = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MODE_CHANGE', 'NORMAL')];
    let testMessageLowPower = new Message('Mode Change Test Low Power', testCommandLowPower);
    let testMessageNormalPower = new Message('Mode Change Test Normal Power', testCommandNormalPower);
    let testMessageSequencePower = new Message('Mode Change Sequence with 2 Commands', testPowerCommandsSequence);
    let testRover = new Rover(98382);
    
    //TODO? Check if command.value is 'LOW_POWER' or 'NORMAL' and throw error if not a valid value

    //Send & validate low power command
    let checkLowPower = testRover.receiveMessage(testMessageLowPower).results;
    
    expect(checkLowPower[0]['completed']).toEqual(true);
    expect(testRover.mode).toEqual('LOW_POWER');

    //Follow up, send & validate normal power command
    let checkNormalPower = testRover.receiveMessage(testMessageNormalPower).results;
    
    expect(checkNormalPower[0]['completed']).toEqual(true);
    expect(testRover.mode).toEqual('NORMAL');
    
    //Send & validate sequenced mode change commands
    let checkSequencePower = testRover.receiveMessage(testMessageSequencePower).results;

    expect(checkSequencePower[0]['completed']).toEqual(true);
    expect(checkSequencePower[1]['completed']).toEqual(true);
    expect(testRover.mode).toEqual('NORMAL');

  });
  //Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testDrainedMoveCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)];
    let testDrainedMoveMessage = new Message('Change to low power, attempt to move', testDrainedMoveCommand);
    let testRover = new Rover(98382);
    
    let checkDrainedRover = testRover.receiveMessage(testDrainedMoveMessage);
    
    expect(checkDrainedRover.results[1]['completed']).toEqual(false);

  });
  //Test 13
  test("responds with the position for the move command", function() {
    let testMoveCommand = [new Command('MOVE', 1000)];
    let testMoveMessage = new Message('Check MOVE response', testMoveCommand);
    let testRover = new Rover(98382);

    let checkMovedRover = testRover.receiveMessage(testMoveMessage);

    expect(checkMovedRover.results[0]['completed']).toEqual(true);
    expect(testRover.position).toEqual(testMoveCommand[0].value);

  });

});
