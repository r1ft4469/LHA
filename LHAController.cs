using Comfort.Common;
using EFT;
using System.Collections;
using System.IO;
using System.Media;
using UnityEngine;

namespace LHA
{
    public class LHAController : MonoBehaviour
    {
        public static GameWorld gameWorld;
        public static float current = 0;
        public static SoundPlayer soundPlayer;
        public static bool isLoaded = false;
        public static bool trigger = false;
        public static SessionResultPanel sessionResultPanel;

        public void Update()
        {
            gameWorld = Singleton<GameWorld>.Instance;
            sessionResultPanel = Singleton<SessionResultPanel>.Instance;

            if (gameWorld == null)
            {
                trigger = false;
                return;
            }

            if (gameWorld.AllPlayers == null)
            {
                trigger = false;
                return;
            }

            if (gameWorld.AllPlayers.Count == 0)
            {
                trigger = false;
                return;
            }

            if (gameWorld.AllPlayers[0] is HideoutPlayer)
            {
                trigger = false;
                return;
            }

            if (sessionResultPanel != null)
            {
                trigger = false;
                return;
            }

            if (!isLoaded)
                LoadAudio();

            current = gameWorld.AllPlayers[0].HealthController.GetBodyPartHealth(EBodyPart.Common).Current;

            if (current <= 220)
            {
                trigger = true;
            }
            else
            {
                if (!trigger)
                    return;

                trigger = false;
            }
        }

        private IEnumerator Start()
        {
            StartCoroutine(Check());
            yield break;
        }

        private IEnumerator Check()
        {
            yield return new WaitUntil(() => trigger == true);
            OnEvent();
            yield return new WaitUntil(() => trigger == false);
            OnEventEndOrNull();
        }

        private static void OnEvent()
        {
            if (!isLoaded)
                LoadAudio();

            soundPlayer.PlayLooping();
        }

        private static void OnEventEndOrNull()
        {
            if (!isLoaded)
                LoadAudio();

            soundPlayer.Stop();
        }

        private static void LoadAudio()
        {
            if (isLoaded)
                return;

            var fullPath = Directory.GetCurrentDirectory() + "\\BepInEx\\plugins\\LHA\\alert.wav";

            soundPlayer = new SoundPlayer
            {
                SoundLocation = fullPath
            };

            soundPlayer.Load();
            isLoaded = true;
        }
    }
}
