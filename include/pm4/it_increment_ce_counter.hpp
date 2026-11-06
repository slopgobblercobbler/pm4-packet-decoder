#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItIncrementCeCounterDef {
    static constexpr std::uint8_t opcode = 0x86;
    static constexpr std::string_view name = "IT_INCREMENT_CE_COUNTER";
    static constexpr std::string_view desc = "Increment constant engine synchronization synchronization counter";
};
}
