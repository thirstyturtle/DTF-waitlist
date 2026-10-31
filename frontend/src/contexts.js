import React from "react";

export const AuthContext = React.createContext(null);

export const ToastContext = React.createContext(() => {});

export const EventContext = React.createContext(null);

// Fleet boss whose fleet waitlist invites go to (All Fleets page). null = your own fleet.
export const InviteTargetContext = React.createContext(null);
