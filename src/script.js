"use strict";

const database = DatabaseSever.tables
const alert = new Audio("../db/Audio/alert.mp3")

class LHA () {
  constructor () {
    path = ModLoader.getModPath["kobra-LHA"]
    ModLoader.onModLoad[path] = path.load.bind(path)
  }
  
  load() {
  
  }
  
  static doTheThing(sessionID) {
    let pmcData = ProfileController.getPmcProfile(sessionID)
    
    if (pmcData.Health.Overall <= 220) {
      alert.play()
      alert.loop() = true
    } else {
      alert.stop() 
    }
  }
}

module.exports.Mod = LHA
