#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItMemSemaphoreDef {
    static constexpr std::uint8_t opcode = 0x39;
    static constexpr std::string_view name = "IT_MEM_SEMAPHORE";
    static constexpr std::string_view desc = "Perform atomic semaphore increment or wait operation in memory";
};
}
