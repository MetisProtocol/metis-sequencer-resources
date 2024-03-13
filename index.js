import { ethers } from "ethers";
import fsp from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";

class ValidationError extends Error {
  constructor(path, index, msg) {
    super(msg);
    this.index = index;
    this.path = path;
  }
}

const isPubkey = (pubkey) => /^0x[0-9a-f]{128}$/.test(pubkey);

const Validate = async (file) => {
  const basedir = path.dirname(file);

  const data = JSON.parse(await fsp.readFile(file, { encoding: "utf-8" }));
  if (!Array.isArray(data)) {
    throw new ValidationError(file, -1, `not an array json file`);
  }

  const ownerSet = new Set();
  const seqSet = new Set();
  const nameSet = new Set();

  for (const [index, item] of data.entries()) {
    if (typeof item.name !== "string" || item.name.length === 0) {
      throw new ValidationError(path, index, `Invalid name: ${item.name}`);
    }

    if (nameSet.has(item.name)) {
      throw new ValidationError(path, index, `Duplicated name: ${item.name}`);
    }
    nameSet.add(item.name);

    if (typeof item.desc !== "string" || item.desc.length === 0) {
      throw new ValidationError(path, index, `Invalid desc: ${item.desc}`);
    }

    if (typeof item.avatar !== "string" || item.avatar.length === 0) {
      throw new ValidationError(path, index, `Null avatar path: ${item.desc}`);
    }

    await fsp.access(
      item.avatar.replace(/^{BASEDIR}/, basedir),
      fsp.constants.F_OK
    );

    if (!ethers.isAddress(item.address)) {
      throw new ValidationError(
        path,
        index,
        `Invalid sequencer owner address: ${item.address}`
      );
    }

    item.address = item.address.toLowerCase();
    if (ownerSet.has(item.address)) {
      throw new ValidationError(
        path,
        index,
        `Duplicated sequencer owner address: ${item.address}`
      );
    }
    ownerSet.add(item.address);

    if (!ethers.isAddress(item.seq_addr)) {
      throw new ValidationError(
        path,
        index,
        `Invalid sequencer address: ${item.seq_addr}`
      );
    }

    item.seq_addr = item.seq_addr.toLowerCase();
    if (seqSet.has(item.seq_addr)) {
      throw new ValidationError(
        path,
        index,
        `Duplicated sequencer address: ${item.seq_addr}`
      );
    }
    seqSet.add(item.seq_addr);

    const url = new URL(item.url);
    if (url.protocol !== "https:") {
      throw new ValidationError(path, index, `Not an https url: ${item.url}`);
    }

    if (!isPubkey(item.pubkey)) {
      throw new ValidationError(
        path,
        index,
        `Not a valid pubkey: ${item.pubkey}`
      );
    }

    const seqAddr = ethers.computeAddress("0x04" + item.pubkey.slice(2));
    if (seqAddr.toLowerCase() != item.seq_addr) {
      throw new ValidationError(
        path,
        index,
        `pubkey and sequencer address not match`
      );
    }
  }
};

const files = await fsp
  .readdir("sequencers", { recursive: true, withFileTypes: true })
  .then((i) => i.filter((f) => f.isFile() && f.name === "all.json"))
  .then((i) => i.map((f) => path.join(f.path, f.name)));

await Promise.all(files.map((v) => Validate(v)));
