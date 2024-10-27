# Metis-Sequencer-Resources
Submit your Sequencer information, which will be displayed on the Metis Decentralized Sequencer page.

## How to Submit Your Sequencer Info
1. Read the [Requirements](#requirements)
2. Copy an existing Sequencer Node entry in `CHAIN_ID/all.json`
3. Fill your details and add your entry to the bottom of the list
4. Add your logo to `assets/` and make sure it's named correctly
5. Submit a pull request

## Requirements
* `name` The name of your Sequencer, may be max 24 characters
* `avatar` must place in this repository's /assets path
  * Must begin with your name  and a `.png` or `.svg` file extension
  * Must fulfill the [PNG/SVG image requirements](#PNG/SVG-image-requirements)
* `desc` A brief description of yourself or your organization, may be max 200 characters
* `address` Your whitelist address for sequencer lock-up. Must be 42-character long hexadecimal strings that start with '0x'.
* `seq_addr` The Sequencer address provided by the server after you run the Sequencer. Must be 42-character long hexadecimal strings that start with '0x'.
* `pubkey` The public key provided by the server after you run the Sequencer. Must be 64 bytes (128 hexadecimal characters) long. Please delete the '04' character in its original format.
* `url` A link to your website or x.com profile. Must be prefixed with https://
* `lst_name` The name of the LST associated with the Sequencer. Optional, with a maximum of 24 characters.
* `lst_url` A link to your website or x.com profile. Must be prefixed with https://

### PNG/SVG Image Requirements
* Use the same width and height for the aspect ratio of 1 
* The width and height must be from 128 px to 256 px 
* The background must be either transparent or cover the whole image 
* The image content must be aligned in the middle both horizontally and vertically 
* The image file size cannot exceed 24 KB

### Example

```json
[
    {
        "name": "Example Name",
        "avatar": "{BASEDIR}/assets/name.png",
        "desc": "This is your chance to describe you. Your description may be no longer than 200 characters. Shorter is better.",
        "address": "0xC8E9fE8B900c77300652e7E0C2F9BE033e0C8371",
        "seq_addr": "0x9920640b57c188a05f566a8ebc2785880a4e2d10",
        "pubkey": "0xe805cd1f5f172e82a10033afab256315f2ddf735270e8498fa1e505d4c460812eda3ff63c0df944c787c464a0b523ec4170d8b07e7aa779d45670ad6d2f34182",
        "url": "https://twitter.com/MetisL2",
        "lst_name": "LST Name",
        "lst_url": "https://twitter.com/MetisL2"
    },
    {
        "name": "METIS",
        "avatar": "{BASEDIR}/assets/metis_01.svg",
        "desc": "This is your chance to describe you. Your description may be no longer than 200 characters. Shorter is better.",
        "address": "0xC8E9fE8B900c77300652e7E0C2F9BE033e0C8371",
        "seq_addr": "0x9920640b57c188a05f566a8ebc2785880a4e2d10",
        "pubkey": "0xe805cd1f5f172e82a10033afab256315f2ddf735270e8498fa1e505d4c460812eda3ff63c0df944c787c464a0b523ec4170d8b07e7aa779d45670ad6d2f34182",
        "url": "https://example.com",
        "lst_name": "",
        "lst_url": ""
    }
]
```

