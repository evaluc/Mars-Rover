class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let heardMessage = message;
      let roverResponse = {
         message: heardMessage.name,
         results: [],
      };

      return roverResponse;
   }
}

module.exports = Rover;