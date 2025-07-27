# ARNSRecordLookup Component Guide

This document explains all the functions and UI features available in the `ARNSRecordLookup` component, which provides a Minecraft-inspired interface for interacting with the ARNS (Arweave Name Service) contract using the ao-js-sdk.

---

## Features Overview

- **Connect your Arweave wallet**
- **Lookup ARNS records by name**
- **Call all major ARNSClient methods**
- **Toggle dry run mode for safe testing**
- **Send custom messages to the contract**
- **View results and errors in a styled UI**

---

## UI Sections & Functions

### 1. Wallet Section
- **Set Wallet**: Connects your browser's Arweave wallet (e.g., ArConnect) to the client for signing messages and enabling write operations.
- **Indicator**: Shows if the wallet is connected.

### 2. Lookup Section
- **Input**: Enter an ARNS name (e.g., `myname.ar`).
- **Lookup Record**: Fetches and displays the ARNS record for the entered name using `getRecord(name)`.

### 3. Record Display
- Shows the fetched ARNS record in formatted JSON if found.

### 4. Client Methods Section
Buttons for the following ARNSClient methods:

- **Wallet Address** (`getCallingWalletAddress`):
  - Fetches and displays the address of the connected wallet.
- **Process ID** (`getProcessId`):
  - Shows the process ID of the ARNS contract.
- **Process Info** (`getProcessInfo`):
  - Fetches and displays metadata about the ARNS contract deployment.
- **Read Only?** (`isReadOnly`):
  - Indicates if the client is in read-only mode (cannot send real transactions).
- **DryRun Mode?** (`isRunningDryRunsAsMessages`):
  - Shows if dry run mode is enabled (simulations are sent as real messages).
- **Get Wallet** (`getWallet`):
  - Displays the current wallet object used by the client.

### 5. DryRun Toggle
- **DryRunAsMessage Mode** (`setDryRunAsMessage`):
  - Checkbox to toggle between simulation (dry run) and real message sending.
  - When checked, actions are sent as real transactions (if wallet is connected).
  - When unchecked, actions are simulated (no state change, no cost).

### 6. Message Result Section
- **Message Data**: Input for the message data string to send to the contract.
- **Tags**: Input for tags as a JSON array (e.g., `[{"name":"Action","value":"GetRecord"}]`).
- **Anchor**: Optional input for the anchor string.
- **Send Message**: Calls `messageResult(data, tags, anchor)` with the above inputs. Shows the result or error.

### 7. Error & Result Display
- **Error**: Any error encountered is shown in a red block.
- **Result**: Any result (from methods or messageResult) is shown in a green block.

---

## Example Usage

1. **Connect your wallet** by clicking "Set Wallet".
2. **Lookup a record**:
   - Enter a name (e.g., `alice.ar`) and click "Lookup Record".
   - The record will be shown if found.
3. **Use client methods**:
   - Click any method button to see its result.
4. **Test dry run mode**:
   - Toggle "DryRunAsMessage Mode" to ON for real transactions, OFF for simulation.
5. **Send a custom message**:
   - Fill in Message Data and Tags, then click "Send Message".
   - Example for a dry run:
     - Message Data: `"getRecord"`
     - Tags: `[ { "name": "Action", "value": "GetRecord" }, { "name": "Name", "value": "alice.ar" } ]`

---

## Notes
- **Wallet must be connected** for write operations or real messages.
- **Dry run mode** is safe for testing and does not change contract state.
- **Tags** must be a valid JSON array.
- **All results and errors** are shown in the UI for easy debugging.

---

## Supported ARNSClient Methods

| Method                          | UI Element         | Description                                              |
|----------------------------------|--------------------|----------------------------------------------------------|
| getRecord(name)                 | Lookup Record      | Fetch ARNS record for a name                             |
| setWallet(wallet)               | Set Wallet         | Set the wallet for signing messages                      |
| getCallingWalletAddress()       | Wallet Address     | Get the address of the connected wallet                  |
| getProcessId()                  | Process ID         | Get the ARNS contract process ID                         |
| getProcessInfo()                | Process Info       | Get deployment info for the ARNS contract                |
| isReadOnly()                    | Read Only?         | Check if client is read-only                             |
| isRunningDryRunsAsMessages()    | DryRun Mode?       | Check if dry run mode is enabled                         |
| setDryRunAsMessage(enabled)     | DryRun Toggle      | Enable/disable dry run as real message                   |
| messageResult(data, tags, anchor)| Send Message      | Send a custom message to the contract                    |
| getWallet()                     | Get Wallet         | Show the current wallet object                           |

---

## Styling
- The UI uses a Minecraft-inspired theme with Tailwind CSS and custom styles for a fun, retro look.

---

## Troubleshooting
- If you see errors about wallet connection, make sure your Arweave wallet extension is installed and unlocked.
- If tags are invalid, ensure you enter a valid JSON array.
- For real transactions, ensure you have sufficient balance and permissions.

---

Enjoy using the ARNSRecordLookup component for all your ARNS contract interactions! 