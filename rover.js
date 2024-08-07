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
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let heardMessage = message;
      let returnObj = {
         message: heardMessage.name,
         results: [completionStatus, ]
      }

      let commandResult = {
         completed: false,
         roverStatus: {mode:, generatorWatts:, position:}
      }

      if (heardMessage includes STATUS_CHECK)
         let statusObj = {
            positions
            modes
            watts
         }
         push to returnObj.results

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
      return returnObj;
   }
}

module.exports = Rover;