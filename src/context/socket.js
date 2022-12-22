import io from "socket.io-client"
import React from 'react'

/* https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65 */

export const socket = io.connect("http://localhost:3000");
export const SocketContext = React.createContext();