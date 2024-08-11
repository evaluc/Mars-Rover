class Rover {
   constructor(position) {
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }

   receiveMessage(message) {
      let heardMessage = message;
      let commandList = heardMessage.commands;
      let resultsArray = [];
      let roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
      let responseObj = {message: heardMessage.name,};


      for (let i = 0; i < commandList.length; i++) {
         //Status Check:
         if (commandList[i].commandType === 'STATUS_CHECK') {
            let commandResult = {
               roverStatus: roverStatus,
               completed: true
            };

            resultsArray.push(commandResult);
            responseObj['results'] = resultsArray;
         } 
         //Mode Change:
         if (commandList[i].commandType === 'MODE_CHANGE') {
            let commandResult = {};

            if (commandList[i].value === 'LOW_POWER') {
               this.mode = commandList[i].value;
               roverStatus.mode = commandList[i].value;
               commandResult['completed'] = true;
            } else if (commandList[i].value === 'NORMAL') {
               this.mode = commandList[i].value;
               roverStatus.mode = commandList[i].value;
               commandResult['completed'] = true;
            }

            resultsArray.push(commandResult);
            responseObj['results'] = resultsArray;
         }
         //Move Command:
         if (commandList[i].commandType === 'MOVE') {
            let commandResult = {};

            if (this.mode === 'LOW_POWER') {
               commandResult['completed'] = false;
            } 

            if (this.mode === 'NORMAL') {
               this.position = commandList[i].value;
               roverStatus.position = commandList[i].value;
               commandResult['completed'] = true;
            }
            
            resultsArray.push(commandResult);
            responseObj['results'] = resultsArray;
          }
         
      }

         return responseObj;
   }
}

module.exports = Rover;

//TODO: Throw error if mode change isn't low power or normal? Though seems out of scope