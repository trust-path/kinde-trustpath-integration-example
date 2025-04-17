# Kinde Auth + [TrustPath.io](https://trustpath.io) Integration

This repository demonstrates how to integrate Kinde Auth workflows with [TrustPath.io](https://trustpath.io) for advanced fraud detection and prevention. The integration helps protect your application from malicious account registrations and account takeover attempts.

## Overview

This integration leverages Kinde's workflow system to evaluate user authentication events (both login and registration) using [TrustPath.io](https://trustpath.io)'s risk evaluation API. The workflow automatically blocks suspicious activities before they can impact your application.

## Features

- Real-time fraud detection during user authentication
- Protection against account takeover attempts
- Malicious account registration prevention
- Automated risk scoring and decision making
- Seamless integration with Kinde Auth workflows

## How It Works

The integration uses Kinde's post-authentication workflow to:

1. Capture authentication events (both login and registration)
2. Collect relevant user data
3. Send evaluation requests to [TrustPath.io](https://trustpath.io)
4. Automatically block access for high-risk activities

[TrustPath.io](https://trustpath.io) evaluates risks using multiple factors:

- IP address analysis
- Email verification
- Device fingerprinting
- Browser behavior analysis

## Setup

### Prerequisites

- A Kinde Auth account
- A [TrustPath.io](https://trustpath.io) API key
- Node.js environment

### Configuration

1. Set up your environment variables:

```env
TRUSTPATH_API_KEY=your_trustpath_api_key
```

2. Import the workflow into your Kinde environment:

```typescript
import { FraudDetectionWorkflow } from "./workflows/fraudDetectionWorkflow";
```

## Implementation Details

The workflow triggers on both new user registrations and existing user logins. It collects relevant user data and sends it to [TrustPath.io](https://trustpath.io) for evaluation:

- For new registrations: `event_type: "account_register"`
- For logins: `event_type: "account_login"`

The workflow automatically denies access if [TrustPath.io](https://trustpath.io) returns a "decline" state.

## Example Usage

```typescript
// The workflow is automatically triggered post-authentication
// No additional code needed in your application
```

## Benefits

- **Real-time Protection**: Detect and block fraudulent activities instantly
- **Comprehensive Risk Assessment**: Evaluate multiple risk factors simultaneously
- **Automated Response**: Automatically block high-risk access attempts
- **User Experience**: Legitimate users experience no friction
- **Easy Integration**: Minimal setup required with Kinde workflows

## Security Considerations

- The integration evaluates both new and existing users
- IP addresses are properly parsed from forwarded headers
- Sensitive user data is handled securely
- Access denial messages are user-friendly but non-specific

## Support

- [Kinde Documentation](https://docs.kinde.com)
- [TrustPath.io Documentation](https://docs.trustpath.io/)

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
