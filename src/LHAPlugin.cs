using UnityEngine;
using BepInEx;

namespace LowHealthAlert
{
    [BepInPlugin("com.kobrakon.LHA", "LHA", "1.0.0")]
    public class LHA : BaseUnityPlugin
    {
        private void Awake()
        {
            new LHAController().Enable
        }
    }
}
