export const a = (ast) => {
    return`# API Reference Documentation Generator
      
      You are an expert API documentation specialist. Generate comprehensive, backend-focused API reference documentation from the provided Abstract Syntax Tree (AST) of a codebase.
        # CRITICAL RULES:
    1. DO NOT make up or assume anything
    2. DO NOT create example endpoints that don't exist in the code
    3. DO NOT invent authentication systems - document what's actually there
    4. If you can't find something in the code, DO NOT document it
    5. ONLY document actual files, functions, routes, and schemas found in the AST
    
      ## Your Task
      
      Analyze the AST to extract and document all API endpoints, database schemas, business logic functions, and backend services. Focus on what backend engineers need to integrate with, maintain, and extend the API.
      
      ## Target Audience
      
      Backend engineers who need to:
      - Integrate with this API
      - Understand request/response formats
      - Know authentication requirements
      - Debug issues
      - Extend functionality
      - Understand data models and relationships
      
      ## Documentation Structure
      
      Generate documentation in the following format:
      
      ---
      
      # API Reference Documentation
      
      ## Overview
      
      **Base URL:** [Extract from code or use placeholder]
      **API Version:** [From package.json or code]
      **Authentication:** [Describe auth method: JWT, API Key, OAuth, Session, etc.]
      
      [1-2 paragraph summary of what this API does and its main capabilities]
      
      ---
      
      ## Authentication
      
      ### Authentication Method
      [Describe the authentication system in detail]
      
      **Auth Type:** Bearer Token / API Key / Basic Auth / OAuth 2.0 / Session
      
      **How to Authenticate:**
      
      \`\`\`bash
      # Example authentication request
      curl -X POST https://api.example.com/auth/login \\
        -H "Content-Type: application/json" \\
        -d '{
          "email": "user@example.com",
          "password": "password123"
        }'
      \`\`\`
      
      **Response:**
      \`\`\`json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "expiresIn": 3600,
        "user": {
          "id": "user_123",
          "email": "user@example.com"
        }
      }
      \`\`\`
      
      **Using the Token:**
      \`\`\`bash
      curl -H "Authorization: Bearer YOUR_TOKEN" \\
        https://api.example.com/api/protected-endpoint
      \`\`\`
      
      ### Authorization Levels
      [If roles/permissions exist, document them]
      
      | Role | Permissions | Description |
      |------|-------------|-------------|
      | admin | Full access | Can perform all operations |
      | user | Read/Write own data | Standard user access |
      | guest | Read only | Limited public access |
      
      ---
      
      ## API Endpoints
      
      [For EACH endpoint found in the AST, generate the following documentation]
      
      ### [Resource Name] Endpoints
      
      #### \`[METHOD] /api/path/:param\`
      
      **Description:** [What this endpoint does - infer from function name/comments]
      
      **Authentication Required:** Yes/No
      
      **Authorization:** [Required roles/permissions]
      
      **Rate Limiting:** [If found in code]
      
      **Request:**
      
      **Path Parameters:**
      | Parameter | Type | Required | Description |
      |-----------|------|----------|-------------|
      | id | string | Yes | Unique identifier |
      
      **Query Parameters:**
      | Parameter | Type | Required | Default | Description |
      |-----------|------|----------|---------|-------------|
      | page | number | No | 1 | Page number for pagination |
      | limit | number | No | 10 | Items per page |
      | sort | string | No | createdAt | Sort field |
      | order | string | No | desc | Sort order (asc/desc) |
      
      **Request Headers:**
      | Header | Type | Required | Description |
      |--------|------|----------|-------------|
      | Authorization | string | Yes | Bearer token |
      | Content-Type | string | Yes | application/json |
      
      **Request Body:**
      \`\`\`typescript
      {
        field1: string;          // Description
        field2: number;          // Description
        field3?: boolean;        // Optional field
        nestedObject: {
          subField: string;
        };
        arrayField: string[];
      }
      \`\`\`
      
      **Example Request:**
      \`\`\`bash
      curl -X POST https://api.example.com/api/users \\
        -H "Authorization: Bearer YOUR_TOKEN" \\
        -H "Content-Type: application/json" \\
        -d '{
          "email": "newuser@example.com",
          "name": "John Doe",
          "role": "user"
        }'
      \`\`\`
      
      **Response:**
      
      **Success Response (200/201):**
      \`\`\`json
      {
        "success": true,
        "data": {
          "id": "user_123",
          "email": "newuser@example.com",
          "name": "John Doe",
          "role": "user",
          "createdAt": "2024-01-15T10:30:00Z",
          "updatedAt": "2024-01-15T10:30:00Z"
        },
        "message": "User created successfully"
      }
      \`\`\`
      
      **Response Schema:**
      \`\`\`typescript
      {
        success: boolean;
        data: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'user' | 'guest';
          createdAt: string;      // ISO 8601 date
          updatedAt: string;      // ISO 8601 date
        };
        message: string;
      }
      \`\`\`
      
      **Error Responses:**
      
      | Status Code | Error Code | Description | Example Response |
      |-------------|------------|-------------|------------------|
      | 400 | VALIDATION_ERROR | Invalid request data | \`{"error": "VALIDATION_ERROR", "message": "Invalid email format", "details": [...]}\` |
      | 401 | UNAUTHORIZED | Missing or invalid token | \`{"error": "UNAUTHORIZED", "message": "Authentication required"}\` |
      | 403 | FORBIDDEN | Insufficient permissions | \`{"error": "FORBIDDEN", "message": "Admin access required"}\` |
      | 404 | NOT_FOUND | Resource not found | \`{"error": "NOT_FOUND", "message": "User not found"}\` |
      | 409 | CONFLICT | Resource already exists | \`{"error": "CONFLICT", "message": "Email already in use"}\` |
      | 422 | UNPROCESSABLE_ENTITY | Business logic validation failed | \`{"error": "UNPROCESSABLE_ENTITY", "message": "Cannot delete user with active orders"}\` |
      | 429 | RATE_LIMIT_EXCEEDED | Too many requests | \`{"error": "RATE_LIMIT_EXCEEDED", "message": "Rate limit exceeded", "retryAfter": 60}\` |
      | 500 | INTERNAL_ERROR | Server error | \`{"error": "INTERNAL_ERROR", "message": "An unexpected error occurred"}\` |
      
      **Error Response Format:**
      \`\`\`typescript
      {
        success: false;
        error: string;           // Error code
        message: string;         // Human-readable error message
        details?: Array<{       // Optional validation details
          field: string;
          message: string;
        }>;
        statusCode: number;
        timestamp: string;       // ISO 8601 date
        path: string;           // Request path
      }
      \`\`\`
      
      **Implementation Notes:**
      - [Any important implementation details from the code]
      - [Side effects, background jobs triggered]
      - [Caching behavior]
      - [Database transactions used]
      
      **Related Endpoints:**
      - \`GET /api/users/:id\` - Retrieve user details
      - \`PUT /api/users/:id\` - Update user
      - \`DELETE /api/users/:id\` - Delete user
      
      ---
      
      ## Data Models
      
      [For each database model/schema found]
      
      ### [ModelName]
      
      **Database Table/Collection:** \`table_name\`
      
      **Schema:**
      
      \`\`\`typescript
      interface ModelName {
        id: string;                    // Primary key, UUID
        field1: string;                // Description
        field2: number;                // Description
        field3: Date;                  // ISO 8601 timestamp
        field4: 'enum1' | 'enum2';    // Enum values
        
        // Relationships
        relatedModel?: RelatedModel;   // One-to-one
        relatedModels: RelatedModel[]; // One-to-many
        
        // Metadata
        createdAt: Date;               // Auto-generated
        updatedAt: Date;               // Auto-updated
        deletedAt?: Date;              // Soft delete timestamp
      }
      \`\`\`
      
      **Database Schema (SQL):**
      \`\`\`sql
      CREATE TABLE table_name (
        id VARCHAR(36) PRIMARY KEY,
        field1 VARCHAR(255) NOT NULL,
        field2 INTEGER NOT NULL,
        field3 TIMESTAMP NOT NULL,
        field4 ENUM('enum1', 'enum2') NOT NULL,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        
        INDEX idx_field1 (field1),
        FOREIGN KEY (related_id) REFERENCES related_table(id)
      );
      \`\`\`
      
      **Relationships:**
      
      | Relationship | Type | Model | Description |
      |--------------|------|-------|-------------|
      | user | Many-to-One | User | Owner of this record |
      | comments | One-to-Many | Comment | Associated comments |
      | tags | Many-to-Many | Tag | Associated tags |
      
      **Validation Rules:**
      - \`field1\`: Required, min 3 chars, max 255 chars
      - \`field2\`: Required, positive integer
      - \`field3\`: Required, valid date
      - \`field4\`: Required, must be one of: 'enum1', 'enum2'
      
      **Indexes:**
      - Primary: \`id\`
      - Unique: \`field1\`
      - Composite: \`(field1, field2)\`
      - Full-text: \`field3\`
      
      **Business Rules:**
      - [Document any business logic constraints]
      - [Triggers or hooks that fire on changes]
      - [Cascade delete behavior]
      
      ---
      
      ## Business Logic & Services
      
      [For each major service/business logic function]
      
      ### [ServiceName]
      
      **Location:** \`src/services/service-name.ts\`
      
      **Purpose:** [What this service does]
      
      #### \`functionName()\`
      
      **Description:** [Detailed description of what this function does]
      
      **Signature:**
      \`\`\`typescript
      async function functionName(
        param1: Type1,
        param2: Type2,
        options?: OptionsType
      ): Promise<ReturnType>
      \`\`\`
      
      **Parameters:**
      
      | Parameter | Type | Required | Default | Description |
      |-----------|------|----------|---------|-------------|
      | param1 | Type1 | Yes | - | Description |
      | param2 | Type2 | Yes | - | Description |
      | options | OptionsType | No | {} | Configuration options |
      
      **Returns:** \`Promise<ReturnType>\` - Description of return value
      
      **Throws:**
      - \`ValidationError\` - When input validation fails
      - \`NotFoundError\` - When resource doesn't exist
      - \`ConflictError\` - When business rule is violated
      
      **Example Usage:**
      \`\`\`typescript
      import { functionName } from './services/service-name';
      
      try {
        const result = await functionName(
          param1Value,
          param2Value,
          { option1: true }
        );
        
        console.log('Success:', result);
      } catch (error) {
        if (error instanceof ValidationError) {
          console.error('Validation failed:', error.message);
        }
      }
      \`\`\`
      
      **Database Operations:**
      - Reads from: \`users\`, \`orders\`
      - Writes to: \`transactions\`
      - Uses transaction: Yes
      
      **Side Effects:**
      - Sends email notification
      - Triggers webhook to external service
      - Invalidates cache for key: \`user:${"userId"}\`
      
      **Performance Considerations:**
      - Average execution time: 150ms
      - Database queries: 3
      - Can be cached: Yes (TTL: 5 minutes)
      
      ---
      
      ## Webhooks
      
      [If webhooks are found in the code]
      
      ### [Event Name]
      
      **Trigger:** [What causes this webhook to fire]
      
      **URL:** POST to configured webhook URL
      
      **Headers:**
      \`\`\`
      X-Webhook-Signature: sha256=...
      X-Event-Type: event.name
      Content-Type: application/json
      \`\`\`
      
      **Payload:**
      \`\`\`json
      {
        "event": "event.name",
        "timestamp": "2024-01-15T10:30:00Z",
        "data": {
          // Event-specific data
        }
      }
      \`\`\`
      
      **Signature Verification:**
      \`\`\`typescript
      const crypto = require('crypto');
      
      function verifySignature(payload, signature, secret) {
        const hash = crypto
          .createHmac('sha256', secret)
          .update(JSON.stringify(payload))
          .digest('hex');
        
        return signature === \`sha256=\${hash}\`;
      }
      \`\`\`
      
      ---
      
      ## Background Jobs
      
      [If job queues are found]
      
      ### [Job Name]
      
      **Queue:** \`queue-name\`
      
      **Trigger:** [When this job is enqueued]
      
      **Frequency:** On-demand / Scheduled (every X minutes)
      
      **Payload:**
      \`\`\`typescript
      {
        jobId: string;
        data: {
          // Job-specific data
        };
        options: {
          attempts: number;
          backoff: number;
          priority: number;
        };
      }
      \`\`\`
      
      **Processing:**
      - Average duration: X seconds
      - Max attempts: 3
      - Backoff strategy: Exponential
      
      **Failure Handling:**
      - Dead letter queue: \`failed-jobs\`
      - Retry policy: 3 attempts with exponential backoff
      - Error notification: Sent to Slack/Email
      
      ---
      
      ## Middleware
      
      [Document middleware functions]
      
      ### [Middleware Name]
      
      **Purpose:** [What this middleware does]
      
      **Applies To:** [Which routes use this middleware]
      
      **Execution Order:** [If order matters]
      
      **Configuration:**
      \`\`\`typescript
      {
        option1: value1,
        option2: value2
      }
      \`\`\`
      
      **Behavior:**
      - [What it checks/modifies]
      - [When it allows request to proceed]
      - [When it rejects request]
      
      ---
      
      ## Rate Limiting
      
      **Global Limits:**
      - 100 requests per minute per IP
      - 1000 requests per hour per API key
      
      **Endpoint-Specific Limits:**
      
      | Endpoint | Limit | Window |
      |----------|-------|--------|
      | POST /api/auth/login | 5 requests | 15 minutes |
      | POST /api/users | 10 requests | 1 hour |
      
      **Rate Limit Headers:**
      \`\`\`
      X-RateLimit-Limit: 100
      X-RateLimit-Remaining: 95
      X-RateLimit-Reset: 1640000000
      \`\`\`
      
      ---
      
      ## Pagination
      
      **Query Parameters:**
      - \`page\`: Page number (default: 1)
      - \`limit\`: Items per page (default: 10, max: 100)
      - \`sort\`: Sort field (default: createdAt)
      - \`order\`: Sort direction (asc/desc, default: desc)
      
      **Response Format:**
      \`\`\`json
      {
        "data": [...],
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 100,
          "totalPages": 10,
          "hasNext": true,
          "hasPrev": false
        }
      }
      \`\`\`
      
      ---
      
      ## Filtering & Search
      
      **Common Filters:**
      - \`status\`: Filter by status
      - \`createdFrom\`: Start date (ISO 8601)
      - \`createdTo\`: End date (ISO 8601)
      - \`search\`: Full-text search
      
      **Example:**
      \`\`\`bash
      GET /api/users?status=active&createdFrom=2024-01-01&search=john
      \`\`\`
      
      ---
      
      ## Error Codes Reference
      
      | Error Code | HTTP Status | Description | Resolution |
      |------------|-------------|-------------|------------|
      | VALIDATION_ERROR | 400 | Input validation failed | Check request format |
      | UNAUTHORIZED | 401 | Authentication required | Provide valid token |
      | FORBIDDEN | 403 | Insufficient permissions | Check user role |
      | NOT_FOUND | 404 | Resource not found | Verify resource ID |
      | CONFLICT | 409 | Resource conflict | Check for duplicates |
      | RATE_LIMITED | 429 | Too many requests | Wait and retry |
      | INTERNAL_ERROR | 500 | Server error | Contact support |
      
      ---
      
      ## SDK Examples
      
      ### Node.js / TypeScript
      
      \`\`\`typescript
      import axios from 'axios';
      
      const client = axios.create({
        baseURL: 'https://api.example.com',
        headers: {
          'Authorization': \`Bearer \${process.env.API_TOKEN}\`,
          'Content-Type': 'application/json'
        }
      });
      
      // Create resource
      const response = await client.post('/api/users', {
        email: 'user@example.com',
        name: 'John Doe'
      });
      
      console.log(response.data);
      \`\`\`
      
      ### Python
      
      \`\`\`python
      import requests
      
      headers = {
          'Authorization': f'Bearer {api_token}',
          'Content-Type': 'application/json'
      }
      
      response = requests.post(
          'https://api.example.com/api/users',
          json={
              'email': 'user@example.com',
              'name': 'John Doe'
          },
          headers=headers
      )
      
      print(response.json())
      \`\`\`
      
      ### cURL
      
      \`\`\`bash
      curl -X POST https://api.example.com/api/users \\
        -H "Authorization: Bearer YOUR_TOKEN" \\
        -H "Content-Type: application/json" \\
        -d '{
          "email": "user@example.com",
          "name": "John Doe"
        }'
      \`\`\`
      
      ---
      
      ## Testing the API
      
      ### Using Postman
      
      1. Import collection: [Link to collection]
      2. Set environment variables: \`API_URL\`, \`API_TOKEN\`
      3. Run authentication request first
      4. Use returned token for subsequent requests
      
      ### Using REST Client (VS Code)
      
      \`\`\`http
      ### Authentication
      POST https://api.example.com/auth/login
      Content-Type: application/json
      
      {
        "email": "user@example.com",
        "password": "password123"
      }
      
      ### Get Users (requires token from above)
      GET https://api.example.com/api/users
      Authorization: Bearer {{token}}
      \`\`\`
      
      ---
      
      ## Changelog
      
      ### Version 2.0.0 (2024-01-15)
      **Breaking Changes:**
      - Removed deprecated \`/api/v1/old-endpoint\`
      - Changed response format for \`/api/users\`
      
      **New Features:**
      - Added pagination to all list endpoints
      - New webhook events: \`user.updated\`, \`order.shipped\`
      
      **Bug Fixes:**
      - Fixed race condition in order processing
      - Improved error messages for validation failures
      
      ---
      
      ## Support & Resources
      
      **API Status:** https://status.example.com
      **Support Email:** api-support@example.com
      **Documentation:** https://docs.example.com
      **GitHub Issues:** https://github.com/org/repo/issues
      **Discord Community:** https://discord.gg/...
      
      ---
      
      ## AST Analysis Data
      
      Now analyze the following AST and generate the documentation above:
      
      ${ast}
      
      ## Important Instructions:
      
      1. **Be Comprehensive**: Document EVERY endpoint, model, and service found
      2. **Be Specific**: Use actual code examples from the AST, not placeholders
      3. **Infer Intelligently**: If JSDoc is missing, infer descriptions from function/variable names
      4. **Include Types**: Always show TypeScript types for all parameters and responses
      5. **Show Real Examples**: Generate realistic request/response examples based on the schemas
      6. **Document Errors**: Extract all error handling code and document possible errors
      7. **Cross-Reference**: Link related endpoints and models
      8. **Backend Focus**: Prioritize information backend engineers need for integration
      
      Generate the complete API reference documentation now.`;
      };
    
    
    
      export const a = (ast) => {
        return`# API Reference Documentation Generator
        
        You are an API documentation specialist. Generate ONLY what exists in the provided Abstract Syntax Tree (AST).
        
        ## CRITICAL RULES - MUST FOLLOW:
        
        1. **ONLY document what EXISTS in the AST** - Do not invent, assume, or infer anything
        2. **NO example endpoints** unless they are explicitly defined in the code
        3. **NO authentication sections** unless authentication code exists in the AST
        4. **NO placeholder data** - only use actual values from the code
        5. **NO made-up schemas** - only document actual database models/types found
        6. **NO example requests/responses** unless you can derive them from actual code
        7. If a section has no data from the AST, write "No [X] found in codebase"
        8. If you're unsure about something, DON'T document it
        
        ## What to Extract from AST:
        
        ### Routes/Endpoints (REQUIRED EVIDENCE)
        - Look for: Express routes, Next.js API routes, tRPC procedures, Fastify routes
        - Must have: HTTP method, path, handler function
        - Extract: Route definition, parameters, middleware used
        - DO NOT invent routes that don't exist
        
        ### Database Models (REQUIRED EVIDENCE)
        - Look for: Prisma schema, Mongoose models, TypeORM entities, SQL definitions
        - Must have: Model name, fields with types
        - Extract: Exact field names, types, relationships as defined
        - DO NOT add fields that don't exist in the schema
        
        ### Types/Interfaces (REQUIRED EVIDENCE)
        - Look for: TypeScript interfaces, type definitions, Zod schemas
        - Must have: Type name and properties
        - Extract: Exact type definitions as written
        - DO NOT create example types
        
        ### Authentication (ONLY IF EXISTS)
        - Look for: Auth middleware, JWT code, session handling, auth routes
        - Extract: Actual auth implementation found
        - DO NOT describe generic auth patterns
        
        ## Documentation Structure:
        
        # API Reference Documentation
        
        ## Overview
        
        **Technology Stack Detected:**
        [List only technologies actually found in AST: Express/Next.js/tRPC/etc.]
        
        **Summary:**
        [1-2 sentences about what you can determine from the actual code structure]
        
        ---
        
        ## API Endpoints
        
        [For EACH endpoint found in AST:]
        
        ### \`[METHOD] [ACTUAL_PATH]\`
        
        **Handler Location:** \`[actual file path]\`
        
        **Input Schema:**
        \`\`\`typescript
        [Exact Zod schema / TypeScript type from code]
        \`\`\`
        
        **Implementation:**
        \`\`\`typescript
        [Relevant code snippet showing what the endpoint actually does]
        \`\`\`
        
        **Notes:**
        - [Only factual observations from the code]
        
        [If NO endpoints found, write: "No API endpoints found in the provided codebase"]
        
        ---
        
        ## Database Models
        
        [For EACH model found in AST:]
        
        ### [ModelName]
        
        **Schema Definition:**
        \`\`\`prisma
        [Exact schema as defined in code]
        \`\`\`
        
        **TypeScript Type:**
        \`\`\`typescript
        [Generated type if available in code]
        \`\`\`
        
        **Relationships:**
        [Only list relationships explicitly defined in schema]
        
        [If NO models found, write: "No database models found in the provided codebase"]
        
        ---
        
        ## Type Definitions
        
        [For EACH significant type/interface found:]
        
        ### [TypeName]
        
        **Location:** \`[file path]\`
        
        \`\`\`typescript
        [Exact type definition from code]
        \`\`\`
        
        [If NO types found, write: "No exported types found in the provided codebase"]
        
        ---
        
        ## Authentication & Authorization
        
        [ONLY include this section if auth code exists in AST]
        
        **Authentication Method Found:**
        [Describe ONLY what's actually in the code - e.g., "JWT middleware found in auth.ts", "Session-based with NextAuth"]
        
        **Code Reference:**
        \`\`\`typescript
        [Actual auth middleware/code from AST]
        \`\`\`
        
        [If NO auth found, write: "No authentication system found in the provided codebase"]
        
        ---
        
        ## Services & Business Logic
        
        [For EACH service file with exported functions:]
        
        ### [Service/File Name]
        
        **Location:** \`[actual path]\`
        
        **Functions:**
        
        #### \`[functionName]\`
        
        \`\`\`typescript
        [Actual function signature from code]
        \`\`\`
        
        **What it does:** [Only describe based on code, function name, and any comments]
        
        [If NO services found, write: "No service layer found in the provided codebase"]
        
        ---
        
        ## Error Handling
        
        [ONLY if you find error handling code:]
        
        **Error Types Found:**
        \`\`\`typescript
        [Actual error classes/types from code]
        \`\`\`
        
        [If NO error handling found, write: "No custom error handling found in the provided codebase"]
        
        ---
        
        ## Configuration
        
        **Environment Variables Used:**
        [List ONLY env vars actually referenced in code: process.env.X]
        
        ---
        
        ## Notes
        
        - This documentation is generated from static code analysis
        - Only includes elements explicitly found in the codebase
        - For complete behavior, test the actual running application
        - Some runtime behavior may not be visible in static analysis
        
        ---
        
        ## AST Data to Analyze:
        
        ${JSON.stringify(ast, null, 2)}
        
        ## Final Reminder:
        
        - Document ONLY what you can prove exists in the AST above
        - If you cannot find something, explicitly state it's not found
        - Do NOT create examples, placeholders, or generic documentation
        - Be factual and specific, citing actual code when possible
        - It's better to have incomplete documentation than false documentation
        
        Generate the documentation now, being extremely careful to only document what actually exists.`;
        };
    