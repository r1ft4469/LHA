import { HttpRouter } from "../routers/HttpRouter.ts"
import { ISyncHealthRequestData } from "../@types/eft/health/IHealthSyncRequestData.ts"
import { ModLoader } from "../loaders/ModLoader"
import { IDatabaseTables } from "../@loaders/spt/server/IDatabaseTables.ts"

const alert = new Audio("../db/Audio/alert.mp3")
var dormantMode = false

export class LHA 
{
  constructor () 
  {
    this.mod = ModLoader.getModPath["kobra-LHA"]
    ModLoader.onModLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/match/join"] = LHA.onMatchStart
  }
  
  load(){}
  
  static onMatchStart()
  {
    setInterval(checkHealth, 500)
  }
  
  static checkHealth()
  {
    let playerRaidHealth = ISyncHealthData.Health

    if (playerRaidHealth <== 220) 
    {
      alert.play()
      alert.loop() = true
    } else 
    {
      alert.stop() 
    }
  }
}
