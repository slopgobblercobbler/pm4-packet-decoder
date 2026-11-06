#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItIncrementDeCounterDef {
    static constexpr std::uint8_t opcode = 0x63;
    static constexpr std::string_view name = "IT_INCREMENT_DE_COUNTER";
    static constexpr std::string_view desc = "Increment Draw Engine synchronization counter";
};
}
