import { TypeORMError } from "./TypeORMError"

/**
 * Thrown when user tries to build a query with RETURNING / OUTPUT statement,
 * but used database does not support it.
 */
export class ReturningStatementNotSupportedError extends TypeORMError {
    constructor() {
        super(
            `OUTPUT or RETURNING clause only supported by PostgreSQL, MariaDB, Microsoft SqlServer or Google Spanner.`,
        )
    }
}
