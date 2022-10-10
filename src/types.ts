export interface IMessage {
  updatedAt: string;
  createdAt: string;
  userId: string;
  documentId: string;
  message: string;
  status: string;
}

export function createMsg(
  text: string,
  userId = "",
  documentId = ""
): IMessage {
  return {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: userId,
    documentId: documentId,
    message: text,
    status: "К рассмотрению",
  };
}
