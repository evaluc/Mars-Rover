/*class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let heardMessage = message;
      let roverStatus = {
         message: heardMessage.name,
         results: heardMessage.commands,
      };
      //I don't think I want to name this roverStatus, 
      //I want a roverStatus object placed in the results array
      return roverStatus;
   }
}

module.exports = Rover;
*/
class Rover {
   constructor(position) {
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }

   receiveMessage(message) {
      let heardMessage = message;
      let commandList = heardMessage.commands;
      //let commandResult = {completed: false,}
      let resultsArray = [];
      let roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
      //let replyObj = {message: heardMessage.name, results: resultsArray};
      let responseObj = {message: heardMessage.name,};


      for (let i = 0; i < commandList.length; i++) {
         if (commandList[i].commandType === 'STATUS_CHECK') {
            let commandResult = {
               completed: true,
               roverStatus: roverStatus
            };

            resultsArray.push(commandResult);
            responseObj['results'] = resultsArray;
            
         }
         /*
         else if (commandList[i].commandType === 'MOVE') {
            let commandResult = {
               completed: true,
            };

            resultsArray.push(commandResult);
            responseObj = {message: heardMessage.name, results: resultsArray};
         }

         else if (commandList[i].commandType === 'MODE_CHANGE') {
            let commandResult = {
               completed: true,
            };

            resultsArray.push(commandResult);
            responseObj = {message: heardMessage.name, results: resultsArray};
         }
         */
      }
      return responseObj;
   }
}

module.exports = Rover;

/* if (heardMessage includes MODE_CHANGE)
         update this.mode
         set completed to true

      if(heardMessage includes MOVE)
         try?
         if (low power) {
            throw an error can't be moved in this state, set completed to false;
         } else if (this.mode === 'NORMAL') {
            update this.position, set completed to true
         }
*/
      //I don't think I want to name this roverStatus, 
      //I want a roverStatus object placed in the results array