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
        Schema::create('visit_applications', function (Blueprint $table) {
            $table->id();
            $table->string('purpose');
            $table->dateTime('starting_at');
            $table->dateTime('ending_at');
            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('visitor_id');
            $table->foreign('status_id')->references('id')->on('visit_application_statuses');
            $table->foreign('employee_id')->references('id')->on('users');
            $table->foreign('visitor_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_applications');
    }
};
