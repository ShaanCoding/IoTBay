import { IoTBayClient } from "../api/generated";

export default new IoTBayClient({
    BASE: import.meta.env.DEV ? "http://localhost:3000" : "https://isd.sebasptsch.dev",
})