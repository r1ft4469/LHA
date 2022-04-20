using Aki.Reflection.Patching;
using System;
using System.Reflection;

namespace LowHealthAlert
{
    public abstract class onRaidStart : ModulePatch
    {
        protected static Type _targetType;
        protected static MethodBase _method;
        public BaseRaidStartupPatch() : base()
        {
            _targetType = ReflectionUtils.FindFirstEftType("GameWorld");
            _method = ReflectionUtils.FindFirstTypeMethod(_targetType, "OnGameStarted");
        }
        protected override MethodBase GetTargetMethod()
        {
            return _method;
        }
    }
}
