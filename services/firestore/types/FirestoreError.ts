
export class FirestoreError extends Error {
    public code?: string;
    public status?: number;
  
    constructor(message: string, code?: string, status?: number) {
      super(message);
      this.name = 'FirestoreError';
      this.code = code;
      this.status = status;
      Object.setPrototypeOf(this, FirestoreError.prototype);
    }
  }
  