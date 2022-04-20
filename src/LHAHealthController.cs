using Comfort.Common;
using EFT;
using EFT.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;

namespace LowHealthAlert
{
    public class LHAHealthController : MonoBehaviour
    {
        protected static Type _targetType;
        protected static MethodBase _method;
        public static bool conditionsMet = false;
        System.Media.SoundPlayer player = new System.Media.SoundPlayer(@"alert");
        private OnRaidStart() : base()
        {
            _targetType = ReflectionUtils.FindFirstEftType("GameWorld");
            _method = ReflectionUtils.FindFirstTypeMethod(_targetType, "OnGameStarted");
            
            if (pmcHealth =< 220)
            {
                conditionsMet = true
            }
            
            if(conditionsMet)
            {
                player.Play();
                player.Loop();
            }
            
            if(!conditionsMet)
            {
                player.Stop();
            }
        }
    }
}
