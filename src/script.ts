import { HttpRouter } from "../routers/HttpRouter.ts"
import { ISyncHealthRequestData } from "../@types/eft/health/IHealthSyncRequestData.ts"
import { ModLoader } from "../loaders/ModLoader"

const database = DatabaseSever.tables
const alert = new Audio("../db/Audio/alert.mp3")
var dormantMode = false

export class LHA 
{
  constructor () {
    this.mod = ModLoader.getModPath["kobra-LHA"]
    ModLoader.onModLoad[this.mod] = this.load.bind(this)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": LHA.onHTTPIntercept}, HttpRouter.onStaticRoute["/client/match/start"]["Interceptor"])
  }
  
  load() {}
  
  static onHTTPIntercept(url, info, sessionID, output) 
  {
    LHA.execute(sessionID)
    
    return(output)
  }

  private static execute(sessionID) 
  {
    if (!dormantMode)
    {
      if (!ISyncHealthRequestData.Health)
      {
        Logger.log("[LHA/HTTPInterceptor]: HTTP intercept was successful, but no data was found, retrying in 30 seconds...", "black", "yellow")
        
        var checks = ""
        
        var time = setInterval
          ( 
            if (!ISyncHealthRequestData.Health)
              {
                checks += 1
                
                return
              } else
              {
                LHA.execute(sessionID)
          , [30000])
          
        if (checks == 5)
        {
          Logger.log("[LHA/HTTPInterceptor]: HTTP Router Intercept has consistantly failed to pull player data and will now enter dormant mode, ensure script is correct before restarting.", "white", "red")

          dormantMode = "true"
          
          return
        }
      }

      Logger.log(`[LHA/HTTPInterceptor]: HTTP Router Interceptor intercepted static route client/match/start and successfully grabbed player data ${sessionID}`)
      
      let playerRaidHealth = ISyncHealthData.Health

      if (playerRaidHealth <== 220) 
      {
        alert.play()
        alert.loop() = true
      } else 
      {
        alert.stop() 
      }
    } else
    {
      Logger.log("[LHA/HTTPInteceptor]: HTTP Interceptor has encountered an unrecoverable error and has entered dormant mode and a server restart is required to disable dormant mode.")
      return
    }
  }
}
