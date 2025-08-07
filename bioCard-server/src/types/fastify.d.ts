import "fastify";
import { Sql } from "postgres";

declare module "fastify" {
  interface FastifyInstance {
    // db: FastifyInstance["pg"];
    sql: Sql;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    func: () => string;
    multipartErrors: {
      FilesLimitError: Error;
      FieldsLimitError: Error;
      RequestFileTooLargeError: Error;
    };
  }
  interface FastifyRequest {
    server: FastifyInstance;

    file: (fieldname?: string) => Promise<{
      file: Readable;
      fieldname: string;
      filename: string;
      encoding: string;
      mimetype: string;
      fields: { [key: string]: string | string[] };
    }>;

    // Multiple file uploads
    files: () => AsyncIterableIterator<{
      file: Readable;
      fieldname: string;
      filename: string;
      encoding: string;
      mimetype: string;
      fields: { [key: string]: string | string[] };
    }>;

    // All parts (files and fields like note, status)
    parts: () => AsyncIterableIterator<{
      fieldname: string; // 'note', 'status', 'images', etc.
      file?: Readable; // present for file fields
      filename?: string;
      encoding?: string;
      mimetype?: string;
      value?: string; // present for text fields like note & status
    }>;
    // For attachFieldsToBody option
    body?: {
      note?: { value: string };
      status?: { value: string };
      images?: { file: Readable; filename: string; mimetype: string };
      [key: string]:
        | { value: string }
        | { file: Readable; filename: string; mimetype: string };
    };
  }
}
