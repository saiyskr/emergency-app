import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000'; // URL of your Node.js server
  private sessionId: string = '';

  constructor() {
    this.socket = io(this.serverUrl);
  }

  // Request a new session ID from the backend
  async createSession(): Promise<string> {
    const response = await fetch(`${this.serverUrl}/create-session`);
    const data = await response.json();
    this.sessionId = data.sessionId;
    return this.sessionId;
  }

  // Join an existing session
  joinSession(sessionId: string, userId: string): void {
    this.sessionId = sessionId;
    this.socket.emit('join-session', sessionId, userId);

    // Listen for user connection events
    this.socket.on('user-connected', (userId) => {
      console.log(`User connected: ${userId}`);
    });

    // Listen for user disconnection events
    this.socket.on('user-disconnected', (userId) => {
      console.log(`User disconnected: ${userId}`);
    });
  }

  // Send a WebRTC offer to another user
  sendOffer(userId: string, description: RTCSessionDescriptionInit): void {
    this.socket.emit('offer', userId, description);
  }

  // Send a WebRTC answer to another user
  sendAnswer(userId: string, description: RTCSessionDescriptionInit): void {
    this.socket.emit('answer', userId, description);
  }

  // Send ICE candidate information to another user
  sendCandidate(userId: string, candidate: RTCIceCandidateInit): void {
    this.socket.emit('candidate', userId, candidate);
  }

  // Listen for incoming WebRTC offers
  onOffer(callback: (id: string, description: RTCSessionDescriptionInit) => void): void {
    this.socket.on('offer', callback);
  }

  // Listen for incoming WebRTC answers
  onAnswer(callback: (description: RTCSessionDescriptionInit) => void): void {
    this.socket.on('answer', callback);
  }

  // Listen for incoming ICE candidates
  onCandidate(callback: (id: string, candidate: RTCIceCandidateInit) => void): void {
    this.socket.on('candidate', callback);
  }
}
