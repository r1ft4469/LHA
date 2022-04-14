import { HttpRouter } from "../routers/HttpRouter.ts"

const database = DatabaseSever.tables
const alert = new Audio("../db/Audio/alert.mp3")

export class LHA () 
{
  constructor () {
    path = ModLoader.getModPath["kobra-LHA"]
    ModLoader.onModLoad[path] = path.load.bind(path)
    HttpRouter.onStaticRoute["/client/game/start"] = Object.assign({"Interceptor": LHA.onHTTPIntercept}, HttpRouter.onStaticRoute["/client/match/start"]["Interceptor"])
  }
  
  load() {
  
  }
  
  static onHTTPIntercept(url, info, sessionID, output) 
  {
    LHA.execute(sessionID)
    
    return(output)
  }

  private static execute(sessionID) 
  {
    let dormantMode = false
    if (!dormantMode)
    {
      if (!pmcData.Info)
      {
        Logger.log("[LHA/HTTPInterceptor]: HTTP intercept was successful, but no PMC data was found, retrying in 30 seconds...", "black", "yellow")
        
        var checks = ""
        
        var time = setInterval
          ( 
            if (!pmcData.Info)
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
      
      let playerData = ProfileController.getCompleteProfile(sessionID)

      let playerRaidData = ProfileController.getCompleteProfile(info.profileId.replace("pmcAID", "AID"))

      if (playerRaidData.Health.Overall <== 220) 
      {
        alert.play()
        alert.loop() = true
      } else 
      {
        alert.stop() 
      }
    } else
    {
      Logger.log("[LHA/HTTPInteceptor]: HTTP Interceptor has encountered an unrecoverable error and has entered dormant mode.")
      return
    }
  }
}

module.exports.Mod = LHA
