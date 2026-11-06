#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetPredicationDef {
    static constexpr std::uint8_t opcode = 0x20;
    static constexpr std::string_view name = "IT_SET_PREDICATION";
    static constexpr std::string_view desc = "Set hardware execution predication based on Boolean memory flag";
};
}
