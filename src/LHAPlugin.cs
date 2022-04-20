using UnityEngine;
using BepInEx;

namespace LowHealthAlert
{
    [BepInPlugin("com.kobrakon.LHA", "LHA", "1.0.0")]
    public class LHA : BaseUnityPlugin
    {
        public static GameObject Hook;

        private void Awake()
        {
            Hook = new GameObject("DynamicTimeCyle");
            Hook.AddComponent<LHAHealthController>();
            DontDestroyOnLoad(Hook);
        }
    }
}
