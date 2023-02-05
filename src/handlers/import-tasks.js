import { randomUUID } from 'node:crypto';
import { parse } from 'csv-parse/sync';

import { database } from "../database.js";


export const importTasks = async (req, res) => {
  const { body } = req;

  const csvContent = getCsvContent(body);

  if (!csvContent) {
    return res.writeHead(400).end(JSON.stringify({
      message: "Import file must be in CSV format!"
    }))
  }

  const records = await parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });

  for (const record of records) {
    const { title, description } = record;

    if(!title || !description) continue;

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    };

    database.insert('tasks', task);
  }

  return res.writeHead(204).end();
}

function getCsvContent(streamContent) {
  if(!streamContent && streamContent.length === 0) {
    return null;
  }

  const lines = streamContent.split("\n");

  let csv = "";

  for(const line of lines) {
    if(line.includes(",")) {
      csv += `${line.replace("\r","")}\n`;
    }
  }

  return csv;
}
