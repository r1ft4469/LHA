using BepInEx;
using UnityEngine;

namespace LHA
{
    [BepInPlugin("com.kobrakon.LHA", "LHA", "1.0.0")]
    public class LHA : BaseUnityPlugin
    {
        public static GameObject Hook;
        private void Awake()
        {
            Hook = new GameObject("LowHealthAlert");
            Hook.AddComponent<LHAController>();
            DontDestroyOnLoad(Hook);
            Logger.LogInfo($"LHA Loading");
        }
    }
}