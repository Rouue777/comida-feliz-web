
export type Meal = {
    productId: string;
    ingredients: string[];
    observation: string;
};

export type MealSize = "M" | "G";

export type CreateMealDto = {
    size: "M" | "G";

    proteinId: string;

    beanId: string;

    baseIds: string[];

    notes?: string;
};

export type MealDraft = {
    size: "M" | "G";

    proteinId: string;
    proteinName: string;

    beanId: string;
    beanName: string;

    baseIds: string[];
    baseNames: string[];

    unitPrice: number;
    subtotal: number;

    notes?: string;
};