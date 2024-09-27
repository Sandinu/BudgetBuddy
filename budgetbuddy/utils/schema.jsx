import { serial, numeric, pgTable, integer, varchar, timestamp } from "drizzle-orm/mysql-core";

export const Budgets = pgTable('budgets',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
    createdAt : timestamp('createdAt').default(sql`now()`)
});

export const Incomes = pgTable('incomes',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
});

export const Investments = pgTable('investments',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    icon : varchar('icon'),
    createdBy : varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expenses',{
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount : varchar('amount').notNull(),
    budgetId : integer('budgetId').referrences(() => Budgets.id),
    createdBy : varchar('createdBy').notNull(),
});