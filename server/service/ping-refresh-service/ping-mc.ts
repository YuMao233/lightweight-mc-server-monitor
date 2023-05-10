import mcProtocol, { NewPingResult, OldPingResult } from "minecraft-protocol";

export interface PingMinecraftServerResponse {
  players: {
    max: number;
    online: number;
    sample?: {
      id: string;
      name: string;
    }[];
  };
  version: string;
  motd: string;
  protocolVersion: number;
}

export interface MotdDescription {
  color: string;
  text: string;
  extra?: Array<MotdDescription>;
}

// 获取无限层的MOTD详情
function getMotdViaDescription(description: MotdDescription[]) {
  let text = "";
  for (const char of description) {
    if (char.extra instanceof Array) {
      text += getMotdViaDescription(char.extra);
    }
    text += char.text;
  }
  text = text.replace(/\u0000/g, "").trim();
  return text;
}

/**
 * Asynchronously pings a Minecraft server using the specified host and port.
 *
 * @param {string} host - The host of the Minecraft server to ping.
 * @param {number} [port=25565] - The port of the Minecraft server to ping. Defaults to 25565.
 * @return {Promise<PingMinecraftServerResponse>} A promise that resolves with information about the Minecraft server.
 */
export function pingMinecraftServer(
  host: string,
  port: number = 25565
): Promise<PingMinecraftServerResponse> {
  return new Promise((resolve, reject) => {
    mcProtocol.ping(
      {
        host,
        port,
        closeTimeout: 10 * 1000,
      },
      (err, result) => {
        let info = result as any;
        if (err) {
          return reject(err);
        }
        try {
          if (info.players && info.description && info.latency) {
            // 新协议
            const newPingResult = info as NewPingResult;
            let motd = "";
            if (typeof newPingResult.description === "object") {
              if (newPingResult.description.extra) {
                motd = getMotdViaDescription(
                  newPingResult.description.extra as MotdDescription[]
                );
              }
            } else if (typeof newPingResult.description === "string") {
              motd = newPingResult.description;
            }
            return resolve({
              players: newPingResult.players,
              version: newPingResult.version.name,
              motd,
              protocolVersion: 1,
            });
          } else {
            // 旧协议
            const oldPingResult = info as OldPingResult;
            return resolve({
              players: {
                max: oldPingResult.maxPlayers,
                online: oldPingResult.playerCount,
              },
              version: oldPingResult.version,
              motd: oldPingResult.motd,
              protocolVersion: 2,
            });
          }
        } catch (error) {
          return reject(err);
        }
      }
    );
  });
}

// async function main() {
//   const st1 = new Date().getTime();
//   const info = await pingMinecraftServer("llxz.cc", 21105);
//   console.log("服务器信息：", info);
//   console.log("服务器信息：", await pingMinecraftServer("ttl.byboy.top"));
//   console.log("服务器信息：", await pingMinecraftServer("xianxiam.fun"));
//   console.log("服务器信息：", await pingMinecraftServer("mc.hypixel.net"));
//   const st2 = new Date().getTime();
//   console.log("SSSPEED:", (st2 - st1) / 1000);
// }

// main();
