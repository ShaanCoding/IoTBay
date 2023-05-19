import childProcess from "child_process";
import path from 'path'
import { fileURLToPath } from 'url'

let childProcessInstance: childProcess.ChildProcess;

export async function setup() {
    // await new Promise<void>((resolve) => {
    //     const pathOfFile = fileURLToPath(import.meta.url);
    
    //     const root = path.join(pathOfFile, "..", "..");
    
    //     childProcessInstance = childProcess.fork(
    //       path.join(root, "dist", "index.js"),
    //       { stdio: "inherit" }
    //     );
    
    //     childProcessInstance.on("message", (message) => {
    //       if (message === "ready") {
    //         resolve();
    //       }
    //     });
    //   });
}

export async function teardown() {
    // childProcessInstance.kill();
}
