import { serial, varchar, pgTable, timestamp, integer} from "drizzle-orm/pg-core"

export const Budgets = pgTable('budgets',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
    createdAt : timestamp('createdAt').defaultNow(),
    color : varchar('color').notNull(),
})

export const Incomes = pgTable('incomes',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
    color : varchar('color').notNull(),
})

export const Investments = pgTable('investments',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
})

export const Expenses = pgTable('expenses',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    budgetId : integer('budgetId').references(() => Budgets.id),
    createdBy : varchar('createdBy').notNull(),
})