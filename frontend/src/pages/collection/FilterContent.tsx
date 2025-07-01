"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { SetRead } from "@/requests/gen/react-query/fastAPI.schemas";
import { useUser } from "@/auth/UserContext";

// Filter Configuration Types
interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  type: "select" | "radio";
  label: string;
  options?: FilterOption[];
  getOptions?: (data: FilterData) => FilterOption[];
  condition?: (data: FilterData) => boolean;
}

interface FilterData {
  releaseYears: number[];
  sets: SetRead[] | undefined;
  user: any;
}

interface FilterValues {
  year: string;
  set: string;
  collection: string;
  variants: string;
}

interface FilterContentProps {
  filterValues: FilterValues;
  setFilterValues: (values: FilterValues) => void;
  variant?: "desktop" | "mobile";
  data: FilterData;
}

// Filter Configurations
const filterConfigs: FilterConfig[] = [
  {
    id: "year",
    type: "select",
    label: "Release Year",
    getOptions: (data) => [
      { value: "All Years", label: "All Years" },
      ...data.releaseYears.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
    ],
  },
  {
    id: "set",
    type: "select",
    label: "Set",
    getOptions: (data) => [
      { value: "All Sets", label: "All Sets" },
      ...(data.sets?.map((set) => ({
        value: set.set_name,
        label: set.set_name,
      })) || []),
    ],
  },
  {
    id: "collection",
    type: "radio",
    label: "Collection Status",
    condition: (data) => !!data.user,
    options: [
      { value: "all", label: "All Cards" },
      { value: "collected", label: "Collected Only" },
      { value: "uncollected", label: "Missing Only" },
    ],
  },
  {
    id: "variants",
    type: "radio",
    label: "Variants",
    options: [
      { value: "all", label: "All Cards" },
      { value: "none", label: "No Variants" },
      { value: "pure_nonsense", label: "Pure Nonsense" },
    ],
  },
];

// Helper function to get filter options
const getFilterOptions = (
  config: FilterConfig,
  data: FilterData
): FilterOption[] => {
  if (config.options) return config.options;
  if (config.getOptions) return config.getOptions(data);
  return [];
};

// Helper function to check if filter should be shown
const shouldShowFilter = (config: FilterConfig, data: FilterData): boolean => {
  if (config.condition) return config.condition(data);
  return true;
};

export default function FilterContent({
  filterValues,
  setFilterValues,
  variant = "desktop",
  data,
}: FilterContentProps) {
  const { user } = useUser();

  const updateFilter = (filterId: string, value: string) => {
    setFilterValues({
      ...filterValues,
      [filterId]: value,
    });
  };

  const renderFilter = (config: FilterConfig) => {
    const options = getFilterOptions(config, data);
    const currentValue = filterValues[config.id as keyof FilterValues] || "";

    if (config.type === "select") {
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium">{config.label}</Label>
          <Select
            value={currentValue}
            onValueChange={(value) => updateFilter(config.id, value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (config.type === "radio") {
      return (
        <div className="space-y-3">
          <Label className="text-sm font-medium">{config.label}</Label>
          {options.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <input
                type="radio"
                id={`${config.id}-${option.value}`}
                name={config.id}
                value={option.value}
                checked={currentValue === option.value}
                onChange={(e) => updateFilter(config.id, e.target.value)}
                className="w-4 h-4 text-purple-600"
              />
              <Label
                htmlFor={`${config.id}-${option.value}`}
                className="text-sm"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`space-y-6 ${variant === "mobile" ? "p-4" : ""}`}>
      {filterConfigs
        .filter((config) => shouldShowFilter(config, { ...data, user }))
        .map((config, index) => (
          <div key={config.id}>
            {renderFilter(config)}
            {index < filterConfigs.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
    </div>
  );
}
