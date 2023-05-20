<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Office>
 */
class OfficeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $workplaceCount = fake()->numberBetween(6, 25);
        $capacity = fake()->numberBetween($workplaceCount, $workplaceCount + 6);

        return [
            'presenting_ability' => fake()->boolean(40),
            'capacity' => $capacity,
            'employee_using_possibility' => fake()->boolean(40),
            'workplace_count' => $workplaceCount,
        ];
    }
}
