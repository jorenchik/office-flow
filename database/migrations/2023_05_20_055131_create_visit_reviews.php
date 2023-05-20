<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visit_reviews', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->tinyInteger('rating');
            $table->unsignedBigInteger('visit_application_id');
            $table->foreign('visit_application_id')->references('id')->on('visit_applications');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_reviews');
    }
};
