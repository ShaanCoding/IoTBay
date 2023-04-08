import { IoTBayClient } from "../api/generated";

export default new IoTBayClient({
    BASE: window.location.origin,
})